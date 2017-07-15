'use strict';

module.exports = `
### TL;DR
Today I released version 5.0.0 of the [babel-plugin-jsx-svg-inject](https://www.npmjs.com/package/babel-plugin-jsx-svg-inject) plugin.
Here's how it came to be.

### The beginning

You may have already heard that [icon fonts look pretty bad compared to the SVG icons](https://css-tricks.com/icon-fonts-vs-svg/).
As long as you don't have to support the very small if not non-existent number of users of
[IE < 9 and Android Browser < 3](http://caniuse.com/#search=svg), you should be safe to use them.
If you don't want to, that's fine - this post is not about convincing you.
However, it's because of the reasons above that I've started to search for a tool that would enable me to use SVG icons as easily as font icons.

### The inspiration

When I started convincing devs at [Codility](https://codility.com) that we should switch to SVG icons,
I was using the article about [introducing the SVG icons on GitHub](https://github.com/blog/2112-delivering-octicons-with-svg).
One thing that inspired me there was the small example of code they provided:

\`\`\`application/x-erb
<%= octicon(:symbol => "plus") %>
\`\`\`

My goal has become to have something as simple as that.

Since a lot of our front-end code is written in Django, this was the first place I turned to.
Fortunately, adding a template tag is quite easy - this is the end result:

\`\`\`django
{% icon "custom-icons/data_science" size="1em"  %}
\`\`\`

The template tag itself is only a few short lines of code, with some basic attribute handling!

That was quick, but it's not where the problem lies.
A part of our code is written in [React](https://facebook.github.io/react/), so it only made sense to have an appropriate component there.
That component would only render the icon that was needed, so including all of the icons in a sprite form was out of question.
And so as the React components are rendered on the client side, I needed to have a way of including the SVG icons in the script bundle.

### The search for an existing tool

Beacuse we're using Webpack for bundling, I had an idea of using one of the existing Webpack loaders;
an example of such a tool is [react-svg-loader](https://www.npmjs.com/package/react-svg-loader).
However, after giving it some thought, I decided not to use the loaders for a couple of reasons:

* They are import-driven.
  What I wanted instead of having one import per icon was to have the one icon component to rule them all.
* We're using [Next.js](https://github.com/zeit/next.js/) that does not support Webpack loaders completely:
  > Warning: Adding loaders to support new file types (css, less, svg, etc.) is not recommended because only the client code gets bundled via webpack and thus it won't work on the initial server rendering.
* Bundler lock-in.
  While we're using mostly [Webpack](https://webpack.js.org/), this approach would require another plugin for e.g. [Rollup](https://github.com/rollup/rollup).
  We're not really planning on using Rollup (it's just not the right use case),
  but I wanted to have a more universal tool that I could later use in other projects.

The best alternative seemed to be using a Babel plugin instead.
Following the advice given in the Next.js README, I checked out [babel-plugin-inline-react-svg](https://www.npmjs.com/package/babel-plugin-inline-react-svg).
While this coveres Next.js, is universal (at least as universal as Babel is), and optimizes images on the fly, it is also import-driven - so I ruled it out.
In the end I couldn't find a plugin that I would be ok with, so I set out to create one.

### Well, there it is

I won't go through the details of [the implementation](https://github.com/fatfisz/babel-plugin-jsx-svg-inject),
but I've created a [plugin](https://www.npmjs.com/package/babel-plugin-jsx-svg-inject) that allows me to do just what I wanted:

\`\`\`jsx
import Icon from 'components/icon';

function NiceIcons() {
  return (
    <div>
      <Icon svgName="path/to/icon" />
      <Icon svgName="path/to/another-icon" />
    </div>
  );
}
\`\`\`

The plugin searches for a specific prop (by default it's \`svgName\`) and inlines an appropriate image file based on it.
Starting with the version 5.0.0 the source of the image is transformed into JSX.
There's also the "unwrapping" mode which more or less turns this:

\`\`\`xml
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <rect x="10" y="10" width="100" height="100" />
</svg>
\`\`\`

into this:

\`\`\`jsx
<Icon
  xmlns="http://www.w3.org/2000/svg"
  width="120"
  height="120"
  viewBox="0 0 120 120"
  svgContents={<rect x="10" y="10" width="100" height="100" />}
/>
\`\`\`

It makes handling the props on the root level a bit easier (instead of using \`React.cloneElement\`).

All in all, creating a Babel plugin is fun!
The [recommended guide](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md)
is quite extensive and additionally covers some trip-up scenarios.

For now the plugin is used on this very page and in some places on the Codility website.
I hope you find it useful too!
If you try it out, you're most welcome to share some feedback about it.
`.slice(1, -1);
