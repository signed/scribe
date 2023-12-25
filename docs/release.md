# How to release a new version

Manual releases for now

[Add version to pnpm publish](https://github.com/pnpm/pnpm/issues/2168)

```
pnpm version 0.5.0 
pnpm login --registry https://registry.npmjs.org
pnpm publish --registry https://registry.npmjs.org --no-git-checks --access public --tag beta --dry-run 
pnpm dist-tag add @signed/scribe@0.5.0 latest
```
