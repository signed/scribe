# How to release a new version

Manual releases for now

```
pnpm login --registry https://registry.npmjs.org
pnpm publish --registry https://registry.npmjs.org --no-git-checks --access public --tag beta --new-version 0.5.0 --dry-run 
pnpm dist-tag add @signed/scribe@0.5.0 latest
```
