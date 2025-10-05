# FlexGrid Decorator

<!-- repo: https://github.com/th3pool/layout-lens -->
<!-- Marketplace link https://marketplace.visualstudio.com/items?itemName=th3pool.layout-lens -->
<!-- id: th3pool.layout-lens -->
<!-- Badges -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Better visualization of CSS Flexbox and Grid properties, color-coded for easy identification of containers and children, including shared properties.

## Features

**Rule of thumb:**  

- **Blue background** = is a flexbox property
- **Red background** = is a grid property
- **Yellow background** = is a shared property (flexbox & grid)
- **Dotted border** = is a container/parent property

![Example](./media/flxvsgrid.png)

## Usage

- Open any CSS, SCSS, or LESS file.
- The extension automatically highlights flex/grid properties according to the above scheme.
- Shared properties (`align-items`, `justify-content`, etc.) are highlighted in yellow.

### Why did I made this extension?

I often find myself confused about whether a property applies to flexbox or grid, so I created this extension to help me quickly identify them while coding. Feel free to use it if you find it helpful!

## Extension Settings

- `layoutLens.enableCommon`: Toggle the visibility of shared properties among flex and grid (default: `false`).
- `layoutLens.enableFlexbox`: Toggle the visibility of flexbox properties (default: `true`).
- `layoutLens.enableGrid`: Toggle the visibility of grid properties (default: `true`).

## This extension is available on

- [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=th3pool.layout-lens)
- [Open VSX Registry](https://open-vsx.org/extension/th3pool/layout-lens)

## Icons

The terrific icon used in this extension was made by me, and I hereby release it into the public domain. Feel free to use it for any purpose, if you have a better one, please open a PR.

## Change Log

All notable changes to the "layout-lens" extension will be documented in the file [CHANGELOG.md](./CHANGELOG.md).

## Known Issues

Please report any issues or feature requests on the [GitHub repository](https://github.com/th3pool/layout-lens).

## License

MIT
