export default {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd: "node update-version.js ${nextRelease.version}",
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: [
          "package.json",
          "package-lock.json",
          "CHANGELOG.md",
          "swagger.yaml",
        ],
        message:
          "release: Release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    "@semantic-release/github",
  ],
  releaseRules: [
    {
      type: "test",
      release: false,
    },
    {
      type: "doc",
      release: "patch",
    },
    {
      type: "refactor",
      release: "patch",
    },
    {
      type: "breaking",
      release: "major",
    },
  ],
  // parserOpts: {
  //   mergePattern: /^Merge pull request #(\d+) from (.*)$/,
  //   mergeCorrespondence: ['id', 'source']
  // }
};
