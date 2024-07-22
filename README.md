# Husky, Prettier & Eslint Setup in Node.js Project
1. This Eslint setup only works with ES6 modules(`type: "module"`) and not common js.
2. Dated 22nd June 2024, It uses all the latest versions for each husky, eslint and prettier.
3. Prettier and Eslint VScode plugin should be installed to show prettier and eslint errors in VScode.
  - It is not necessary. We can lint and pretty our code also with `eslint --fix` cmd before making commit. 
  - And we can enforce linting using husky hooks. If linting failed, then husky hook will abort the commit.


## Husky Setup
1. `npx husky init`
  - It creates pre-commit file in .husky folder
2. We can write shell commands with that file.
3. These cmds will auto-run with `git commit`
4. Similarly we can create pre-push file manually that will auto-run with `git push` cmd.


## Prettier Setup
1. `prettier.config.js` is config file for prettier.
2. Prettier give warnings only if its plugin is installed in vscode.
3. `npx prettier --write` command is used to fix all prettier related warning.
4. Prettier default or recommended config if no prettier config file is there.
```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "vueIndentScriptAndStyle": false,
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "singleAttributePerLine": false
}
```

## Eslint Setup (includes Prettier)
1. `eslint.config.js` is a config file for eslint.
2. `eslint --fix` is a cmd to fix all linting errors at once.
3. Eslint give warnings only if its plugin is installed in vscode
4. `ignores` property can be used to ignore files or folders based on patterns.
5. `languageOptions` property is used to specify environment ie node or browser.
6. If an `ignores` or `languageOptions` key is used without any other keys in the configuration object, then the patterns or options act as global config.
7. `prettier/prettier` is a rule in eslint to use enforce prettier within eslint.
  - Within this rule, we can specify prettier configurations and it will override `prettier.config.js` rules if there is any
8. To change eslint rules for a sub-directory, we can create a new `eslint.config.js` file within that subdir.


## Lint Staged (Uses Eslint)
1. Lint Staged runs `eslint --fix` cmd only on the git staged files.
2. Changes made by lint-staged are also staged automatically by this package.
  - This is a required behaviour for pre-commit hook
3. Without lint staged, eslint runs fix to all files and also don't stage them. It is an unwanted behaviour for pre-commit hook as eslint fixes won't be commited.


## Jest with ES6 (ES2015+)
1. Jest doesn't support ES6 module syntax by default so either we need to use babel with jest or enable jest experimental flag `--experimental-vm-modules`.
2. Babel converts ECMAScript 2015+ code into a backwards compatible version of JavaScript
3. `.babelrc` file and three extra dependencies would be required for first option: `babel-jest`, `@babel/core` and `@babel/preset-env`
4. With Second option, we need to change jest test command: `node --experimental-vm-modules node_modules/jest/bin/jest.js src`
5. `globals.jest` global should be set in eslint config to enable support for jest global functions and variables.
6. `coverageThreshold` can be set in jest config to fail jest coverage cmd below certain threshold percentage.

**Note**: VSCode doesn't support jest intellisense without @types/jest, so we might need to setup jsconfig.json file for it in JS(non-TS) project.

## Babel and transpiling on Production server
1. Production server doesn't install dev dependencies like babel, webpack.
  - `npm ci --omit=dev`
2. So if we are using babel(or webpack etc), we need to traspile code into `dist` folder and push it to production server.
  - On development/local server, we don't need to have the `dist` folder as dev dependencies are installed there.
3. We couldn't even create final build into dist folder on production server as dev dependencies aren't there, so we need to push it through CI/CD pipeline.
4. In this project, there is no need to transpile code as we are using babel just to support jest library and jest library itself a dev dependency.


## Semantic Release
1. It automatically updates a project version(major/minor/patch), creates a new commit for its changes, creates a new tag with updated version and attach it a new release.
  - sematic-release configuration file controls the automating behaviour.
  - Eg: if the commit message contains the `feat/feature` then only sematic-release proceeds creates the above flow.
2. Requirements:
  - Need to have semnatic release installed and required plugins.
  - [Configuration file](./release.config.js) `release.config.js` is required.
  - CI/CD pipeline(Jenkins/GitHub actions) setup is required to automatically run semantic-release on push/pull-request.

3. Creating Github action:
  - https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/ci-configurations/github-actions.md
4. Commit Message Format to trigger sematic-release:
  - https://github.com/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format
5. File to include while creating a automated semnatic commit:
  - `plugins[][1].assets` contains the files included in commit
  - https://github.com/semantic-release/git?tab=readme-ov-file#options
6. Semantic release steps:
  - https://levelup.gitconnected.com/basic-guide-to-semantic-release-9e2aa7834e4b
7. Semantic-release release rules and types:
  - https://github.com/semantic-release/commit-analyzer?tab=readme-ov-file#usage
8. Semantic release parser options to control when to trigger sematic-release
  - https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser#mergepattern

## Customised Logger with Log File Rotation
1. It changes the logging behaviour. Instead of logging into stdout console, it saves the logs to a file.
2. Log files are automatically rotated each day, so they won't exceed the size.
