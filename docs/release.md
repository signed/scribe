# How to release a new version
Manual releases for now

```
yarn login --registry https://registry.npmjs.org
yarn publish --registry https://registry.npmjs.org --access public --new-version 0.4.0 --tag beta
yarn tag add @signed/scribe@0.4.0 latest
```

