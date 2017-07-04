# DEPRECATED

Please use the following package: [prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (`ext install prettier-vscode`).
This package is deprecated and won't be maintained anymore.

# Prettier-ESLint for Visual Studio Code

Format your javascript via Prettier and ESLint --fix. This uses [`prettier-eslint`][prettier-eslint] to automatically format and fix on save.

## Usage

- You can manually run the command: ![](https://github.com/RobinMalfait/prettier-eslint-code/raw/master/screenshots/command.png)
- You can use the build in formatter: ![](https://github.com/RobinMalfait/prettier-eslint-code/raw/master/screenshots/format.png)

When you enable the `editor.formatOnSave` config, it works out of the box!

## Settings

- `prettier.printWidth` can be used to set a custom print width.
- `prettier-eslint.eslintPath` can be used to set a custom eslint path.

## Prettier - Settings

```js
{
  // Indent lines with tabs
  "prettier.useTabs": false,

  // Fit code within this line limit
  "prettier.printWidth": 80,

  // Number of spaces it should use per tab
  "prettier.tabWidth": 2,

  // If true, will use single instead of double quotes
  "prettier.singleQuote": false,

  // Controls the printing of trailing commas wherever possible. Valid options:
  // "none" - No trailing commas
  // "es5"  - Trailing commas where valid in ES5 (objects, arrays, etc)
  // "all"  - Trailing commas wherever possible (function arguments)
  "prettier.trailingComma": "none",

  // Controls the printing of spaces inside object literals
  "prettier.bracketSpacing": true,

  // If true, puts the `>` of a multi-line jsx element at the end of
  // the last line instead of being alone on the next line
  "prettier.jsxBracketSameLine": false,

  // Which parser to use. Valid options are 'flow' and 'babylon'
  "prettier.parser": "babylon",

  // Whether to add a semicolon at the end of every line (semi: true),
  // or only at the beginning of lines that may introduce ASI failures (semi: false)
  "prettier.semi": true,
}
```

### Installation

Install through VS Code extensions. Search for `Prettier - ESLint`

[Visual Studio Code Market Place: Prettier - ESLint](https://marketplace.visualstudio.com/items?itemName=RobinMalfait.prettier-eslint-vscode)

Can also be installed using 

```
ext install prettier-eslint-vscode
```

## Known Issues

/

## Release Notes

Take a look at our [CHANGELOG](CHANGELOG.md)

[prettier-eslint]: https://github.com/prettier/prettier-eslint