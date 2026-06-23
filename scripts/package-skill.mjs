#!/usr/bin/env node

/**
 * package-skill.mjs
 *
 * Wraps a DESIGN.md + metadata into an installable .skill.md file.
 *
 * Usage:
 *   node scripts/package-skill.mjs \
 *     --input skills/stripe-style.design.md \
 *     --name stripe-style \
 *     --source "https://stripe.com" \
 *     --genre "editorial-tech" \
 *     --tags "dark,gradient,saas,bold-typography"
 *
 * Output: skills/stripe-style.skill.md
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : true;
      opts[key] = val;
    }
  }
  return opts;
}

function buildFrontmatter(opts) {
  const tags = (opts.tags || '').split(',').map(t => t.trim()).filter(Boolean);
  const tagYaml = tags.length ? `[${tags.map(t => `"${t}"`).join(', ')}]` : '[]';

  return [
    '---',
    `name: ${opts.name || 'unnamed-style'}`,
    `description: ${opts.description || 'Extracted design system — add a description'}`,
    `source: ${opts.source || ''}`,
    `extracted: ${new Date().toISOString().split('T')[0]}`,
    `genre: ${opts.genre || 'general'}`,
    `tags: ${tagYaml}`,
    '---',
    '',
  ].join('\n');
}

function buildQuickReference(opts, designContent) {
  // extract key values from the design content for quick reference
  // This is a best-effort extraction; the SKILL.md instructs the agent to
  // fill in the quick reference card manually for accuracy.
  const extract = (pattern) => {
    const match = designContent.match(pattern);
    return match ? match[1] : '—';
  };

  const headingFont = extract(/\*\*Display \/ Heading\*\*[^\n]*\n[^\n]*\|\s*`([^`]+)`/);
  const bodyFont = extract(/\*\*Body\*\*[^\n]*\n[^\n]*\|\s*`([^`]+)`/);
  const heroSize = extract(/\| Hero[^|]*\|\s*(\d+px)\s*\|/);
  const canvas = extract(/\| Canvas\s*\|[^|]*\|\s*\n[^|]*\|\s*`([^`]+)`\s*\|/);

  const title = (opts.name || 'unnamed-style')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return [
    `# ${title}`,
    '',
    '## When to Use This Design System',
    '',
    opts.description || `Design system extracted from ${opts.source}. Apply this skill to generate new work in this style.`,
    '',
    '## Quick Reference',
    '',
    '> For full details, see the complete specification below.',
    '',
    '### Palette',
    `- Canvas: ${opts.canvas || 'see below'}`,
    `- Accent: ${opts.accent || 'see below'}`,
    '',
    '### Typography',
    `- Heading: ${headingFont}`,
    `- Body: ${bodyFont}`,
    `- Hero size: ${heroSize}`,
    '',
    '### Motion',
    `- Transition: ${opts.transition || 'see below'}`,
    '',
    '---',
    '',
  ].join('\n');
}

function main() {
  const opts = parseArgs();

  if (!opts.input) {
    console.error('Error: --input <path> is required');
    process.exit(1);
  }

  const inputPath = join(REPO_ROOT, opts.input);
  const outputName = (opts.name || 'unnamed-style').replace(/\.skill\.md$/, '') + '.skill.md';
  const outputPath = join(REPO_ROOT, 'skills', outputName);

  if (!existsSync(inputPath)) {
    console.error(`Error: input file not found: ${inputPath}`);
    process.exit(1);
  }

  const designContent = readFileSync(inputPath, 'utf-8');
  const frontmatter = buildFrontmatter(opts);
  const quickRef = buildQuickReference(opts, designContent);

  // Assemble the .skill.md
  const skillContent = frontmatter + quickRef + designContent;

  writeFileSync(outputPath, skillContent, 'utf-8');
  console.log(`✓ Packaged: ${outputPath}`);
  console.log(`  Name: ${opts.name}`);
  console.log(`  Source: ${opts.source}`);
  console.log(`  Genre: ${opts.genre}`);

}

main();
