#!/usr/bin/env node
// Links Agent Skills shipped by allowlisted dependencies into .agents/skills and
// .claude/skills. Reads files only — dependency code is never imported or executed.
// Config lives in package.json under "agentSkills": { packages: [], exclude: [] }.
// Run with --check to fail instead of writing (CI).

import fs from 'node:fs';
import path from 'node:path';

const check = process.argv.includes('--check');
const targets = ['.agents/skills', '.claude/skills'];
const { agentSkills = {} } = JSON.parse(
	fs.readFileSync('package.json', 'utf8'),
);
const exclude = new Set(agentSkills.exclude ?? []);

// ponytail: skills/ at the package root is the convention. A package that hides
// them elsewhere (playwright-core) needs a path override — add one when it comes up.
const found = new Map();
for (const pkg of agentSkills.packages ?? []) {
	const dir = path.join('node_modules', pkg, 'skills');
	if (!fs.existsSync(dir)) {
		console.warn(`skip ${pkg}: no skills/ directory`);
		continue;
	}
	for (const name of fs.readdirSync(dir)) {
		if (exclude.has(name)) continue;
		if (!fs.existsSync(path.join(dir, name, 'SKILL.md'))) continue;
		const owner = found.get(name);
		if (owner) {
			console.warn(`skip ${pkg}/${name}: name already claimed by ${owner.pkg}`);
			continue;
		}
		found.set(name, { pkg, dir: path.resolve(dir, name) });
	}
}

// Only links pointing into node_modules are ours; vendored skill directories are left alone.
const ours = (p) => {
	const s = fs.lstatSync(p, { throwIfNoEntry: false });
	return s?.isSymbolicLink() && fs.readlinkSync(p).includes('node_modules');
};

let stale = 0;
for (const dir of targets) {
	fs.mkdirSync(dir, { recursive: true });
	for (const name of fs.readdirSync(dir)) {
		const p = path.join(dir, name);
		if (!found.has(name) && ours(p)) {
			stale++;
			console.log(`${check ? 'stale' : 'remove'} ${p}`);
			if (!check) fs.rmSync(p);
		}
	}
	for (const [name, { dir: src }] of found) {
		const p = path.join(dir, name);
		const want = path.relative(dir, src);
		if (fs.lstatSync(p, { throwIfNoEntry: false })) {
			if (!ours(p)) throw new Error(`${p} exists and is not a dependency link`);
			if (fs.readlinkSync(p) === want) continue;
			if (!check) fs.rmSync(p);
		}
		stale++;
		console.log(`${check ? 'missing' : 'link'} ${p} -> ${want}`);
		if (!check) fs.symlinkSync(want, p);
	}
}

if (check && stale) {
	console.error(`\n${stale} skill link(s) out of date — run: npm run skills`);
	process.exit(1);
}
console.log(check ? 'skill links up to date' : `${found.size} skill(s) linked`);
