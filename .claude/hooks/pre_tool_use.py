#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.8"
# dependencies = [
#     "python-dotenv",
# ]
# ///

import json
import os
import sys
import re
from pathlib import Path

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # dotenv is optional

def handle_rm_command(command):
    """
    Handle rm commands by renaming single files with .delete extension.
    Returns None if allowed, or an error message if blocked.
    Also returns the path that was renamed if applicable.
    """
    # Check if command contains rm
    if not re.search(r'\brm\b', command):
        return None, None

    # Block any rm with -r or -rf flags (recursive deletion)
    if re.search(r'\brm\b.*-[a-z]*r', command):
        return "BLOCKED: Cannot delete directories recursively. Delete manually if needed.", None

    # Extract file paths from rm command
    parts = command.split()
    paths = []

    for part in parts[1:]:  # Skip 'rm' itself
        # Skip flags
        if part.startswith('-'):
            continue
        # This is a file path
        paths.append(part)

    # Block if no paths found (shouldn't happen but safety check)
    if not paths:
        return "BLOCKED: No file path detected in rm command", None

    # Block if multiple paths
    if len(paths) > 1:
        return "BLOCKED: Cannot delete multiple files. Delete them one at a time or manually.", None

    # Single file path - check if it exists and is a file
    file_path = Path(paths[0])

    # If file doesn't exist, allow the command to fail naturally
    if not file_path.exists():
        return None, None

    # Block if it's a directory
    if file_path.is_dir():
        return "BLOCKED: Cannot delete directories. Delete manually if needed.", None

    # Block if path contains wildcards
    if '*' in paths[0] or '?' in paths[0]:
        return "BLOCKED: Cannot use wildcards with rm. Delete files individually or manually.", None

    # It's a single file - rename it with .delete extension
    new_path = Path(str(file_path) + '.delete')
    try:
        file_path.rename(new_path)
        return f"File marked for deletion: {file_path} -> {new_path}", str(new_path)
    except Exception as e:
        return f"BLOCKED: Could not rename file: {e}", None

def is_dangerous_rsync_command(command):
    """
    Detection of dangerous rsync commands with --delete flag.
    """
    # Normalize command by removing extra spaces and converting to lowercase
    normalized = ' '.join(command.lower().split())

    # Check for rsync with --delete flag
    if re.search(r'\brsync\b', normalized) and re.search(r'--delete', normalized):
        return True

    return False

def is_env_file_access(tool_name, tool_input):
    """
    Check if any tool is trying to access .env files containing sensitive data.
    """
    if tool_name in ['Read', 'Edit', 'MultiEdit', 'Write', 'Bash']:
        # Check file paths for file-based tools
        if tool_name in ['Read', 'Edit', 'MultiEdit', 'Write']:
            file_path = tool_input.get('file_path', '')
            if '.env' in file_path and not file_path.endswith('.env.sample'):
                return True

        # Check bash commands for .env file access
        elif tool_name == 'Bash':
            command = tool_input.get('command', '')
            # Pattern to detect .env file access (but allow .env.sample)
            env_patterns = [
                r'\b\.env\b(?!\.sample)',  # .env but not .env.sample
                r'cat\s+.*\.env\b(?!\.sample)',  # cat .env
                r'echo\s+.*>\s*\.env\b(?!\.sample)',  # echo > .env
                r'touch\s+.*\.env\b(?!\.sample)',  # touch .env
                r'cp\s+.*\.env\b(?!\.sample)',  # cp .env
                r'mv\s+.*\.env\b(?!\.sample)',  # mv .env
            ]

            for pattern in env_patterns:
                if re.search(pattern, command):
                    return True

    return False

def get_project_root():
    """
    Get project root from CLAUDE_PROJECT_ROOT environment variable.
    Falls back to finding .claude directory if not set.
    """
    # First, try environment variable
    env_root = os.getenv('CLAUDE_PROJECT_ROOT')
    if env_root:
        return Path(env_root)

    # Fallback: find .claude directory
    current = Path.cwd().resolve()
    for parent in [current] + list(current.parents):
        if (parent / '.claude').exists():
            return parent

    # Last resort: current directory
    return current

def main():
    try:
        # Read JSON input from stdin
        input_data = json.load(sys.stdin)

        tool_name = input_data.get('tool_name', '')
        tool_input = input_data.get('tool_input', {})

        # Check for .env file access (blocks access to sensitive environment files)
        if is_env_file_access(tool_name, tool_input):
            print("BLOCKED: Access to .env files containing sensitive data is prohibited", file=sys.stderr)
            print("Use .env.sample for template files instead", file=sys.stderr)
            sys.exit(2)  # Exit code 2 blocks tool call and shows error to Claude

        # Check for dangerous commands
        if tool_name == 'Bash':
            command = tool_input.get('command', '')

            # Handle rm commands - either rename single files or block
            error_msg, renamed_path = handle_rm_command(command)
            if error_msg:
                if renamed_path:
                    # File was renamed successfully - inform Claude
                    print(error_msg, file=sys.stderr)
                    sys.exit(2)  # Exit code 2 blocks tool call and shows message to Claude
                else:
                    # Blocked without action
                    print(error_msg, file=sys.stderr)
                    sys.exit(2)  # Exit code 2 blocks tool call and shows error to Claude

            # Block rsync commands with --delete flag
            if is_dangerous_rsync_command(command):
                print("BLOCKED: Dangerous rsync --delete command detected and prevented", file=sys.stderr)
                sys.exit(2)  # Exit code 2 blocks tool call and shows error to Claude

        # Ensure log directory exists using project root
        project_root = get_project_root()
        log_dir = project_root / '.claude' / 'logs'
        log_dir.mkdir(parents=True, exist_ok=True)
        log_path = log_dir / 'pre_tool_use.json'

        # Read existing log data or initialize empty list
        if log_path.exists():
            with open(log_path, 'r') as f:
                try:
                    log_data = json.load(f)
                except (json.JSONDecodeError, ValueError):
                    log_data = []
        else:
            log_data = []

        # Append new data
        log_data.append(input_data)

        # Write back to file with formatting
        with open(log_path, 'w') as f:
            json.dump(log_data, f, indent=2)

        sys.exit(0)

    except json.JSONDecodeError:
        # Gracefully handle JSON decode errors
        sys.exit(0)
    except Exception:
        # Handle any other errors gracefully
        sys.exit(0)

if __name__ == '__main__':
    main()
