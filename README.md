# commonmark-react-object-renderer

> Renderer for CommonMark which returns a React description object

This renders a "description" of a React element which can be then used for rendering, e.g. with [react-from-object](https://www.npmjs.com/package/react-from-object).
It's especially useful for passing rendered markdown from server to the client.

## Example

```js
import { Parser } from 'commonmark';
import Renderer from 'commonmark-react-object-renderer';

const parser = new Parser();
const renderer = new Renderer();

const input = `
# This is a header

And this is a paragraph
`;
const ast = parser.parse(input);
const result = renderer.render(ast);

assert.deepStrictEqual(result, {
  type: 'div',
  children: [
    {
      type: 'h1',
      children: ['This is a header'],
    },
    {
      type: 'p',
      children: ['And this is a paragraph'],
    },
  ],
});
```

## Methods

Each instance of `Renderer` has these methods:

#### `render(ast)`

Returns the rendered markdown in the React element "description" format.

The first argument should be the ast as returned by the commonmark parser.

## Options

Options can be passed as the first argument to the `Renderer` constructor, e.g. `new Renderer(options)`.

#### `renderers`

This object should contain properties named after the possible node types as returned by the commonmark parser.
Those include: `block_quote`, `code_block`, `code`, `document`, `emph`, `heading`, `html_block`, `html_inline`, `image`, `item`, `linebreak`, `link`, `list`, `paragraph`, `softbreak`, `strong`, `text`, `thematic_break`.

Each property should be a function that takes two arguments, in the following order:
* The node, as returned by the commonmark parser (for possible properties please refer to [the documentation](https://github.com/jgm/commonmark.js))
* The newly created element in an initial (empty) state

Those functions should return the rendered element, which can be either the modified second argument or a completely new object.

For an example usage please refer to the tests.

## License

Copyright (c) 2017 Rafał Ruciński. Licensed under the MIT license.
