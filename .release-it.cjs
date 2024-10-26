// https://github.com/release-it/release-it/blob/main/docs/configuration.md
// https://github.com/release-it/release-it/blob/main/config/release-it.json
module.exports = {
  git: {
    commitMessage: 'release ${npm.name} ${version}',
    tagName: '${npm.name}@${version}',
  },
  npm: {
    publish: true,
  },
}
