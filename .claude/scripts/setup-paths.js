#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get absolute path to project root (two levels up from .claude/scripts/)
const projectRoot = path.resolve(__dirname, '../..');
const settingsPath = path.resolve(__dirname, '../settings.json');
const hookScriptsDir = path.resolve(__dirname, '../hooks');

console.log(`Setting up Claude Code paths for: ${projectRoot}`);

try {
  // Read current settings
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

  // Add or update environment variable
  if (!settings.env) {
    settings.env = {};
  }
  settings.env.CLAUDE_PROJECT_ROOT = projectRoot;

  // Collect hook script paths and make them executable
  const hookScriptPaths = new Set();

  // Update all hook commands to use absolute paths
  if (settings.hooks) {
    Object.keys(settings.hooks).forEach(hookType => {
      settings.hooks[hookType].forEach(matcher => {
        if (matcher.hooks) {
          matcher.hooks.forEach(hook => {
            if (hook.command && hook.command.startsWith('hooks/')) {
              // Extract the relative command and any arguments
              const parts = hook.command.split(' ');
              const relativeScript = parts[0]; // e.g., "hooks/pre_tool_use.py"
              const args = parts.slice(1).join(' '); // e.g., "--backup --verbose"

              // Convert to absolute path
              const scriptName = path.basename(relativeScript);
              const absolutePath = path.join(hookScriptsDir, scriptName);

              // Track this script for making executable
              hookScriptPaths.add(absolutePath);

              // Update command with absolute path
              hook.command = args ? `${absolutePath} ${args}` : absolutePath;
            }
          });
        }
      });
    });
  }

  // Make all hook scripts executable
  let madeExecutable = 0;
  hookScriptPaths.forEach(scriptPath => {
    try {
      fs.chmodSync(scriptPath, 0o755);
      madeExecutable++;
    } catch (error) {
      console.warn(`⚠️  Could not make ${path.basename(scriptPath)} executable: ${error.message}`);
    }
  });

  // Write updated settings back to file
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n');

  console.log('✅ Successfully updated settings.json:');
  console.log(`   - CLAUDE_PROJECT_ROOT: ${projectRoot}`);
  console.log(`   - Hook scripts converted to absolute paths`);
  console.log(`   - Made ${madeExecutable} hook script(s) executable`);

} catch (error) {
  console.error('❌ Failed to update settings.json:', error.message);
  process.exit(1);
}