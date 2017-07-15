'use strict';

module.exports = {
  type: 'div',
  children: [
    {
      type: 'h3',
      children: ['TL;DR'],
    },
    {
      type: 'p',
      children: [
        'Today I released version 5.0.0 of the ',
        {
          type: 'a',
          props: {
            href: 'https://www.npmjs.com/package/babel-plugin-jsx-svg-inject',
          },
          children: ['babel-plugin-jsx-svg-inject'],
        },
        ' plugin. Here\'s how it came to be.',
      ],
    },
    {
      type: 'h3',
      children: ['The beginning'],
    },
    {
      type: 'p',
      children: [
        'You may have already heard that ',
        {
          type: 'a',
          props: {
            href: 'https://css-tricks.com/icon-fonts-vs-svg/',
          },
          children: ['icon fonts look pretty bad compared to the SVG icons'],
        },
        '. As long as you don\'t have to support the very small if not non-existent number of users of ',
        {
          type: 'a',
          props: {
            href: 'http://caniuse.com/#search=svg',
          },
          children: ['IE < 9 and Android Browser < 3'],
        },
        ', you should be safe to use them. If you don\'t want to, that\'s fine - this post is not about convincing you. However, it\'s because of the reasons above that I\'ve started to search for a tool that would enable me to use SVG icons as easily as font icons.',
      ],
    },
    {
      type: 'h3',
      children: ['The inspiration'],
    },
    {
      type: 'p',
      children: [
        'When I started convincing devs at ',
        {
          type: 'a',
          props: {
            href: 'https://codility.com',
          },
          children: ['Codility'],
        },
        ' that we should switch to SVG icons, I was using the article about ',
        {
          type: 'a',
          props: {
            href: 'https://github.com/blog/2112-delivering-octicons-with-svg',
          },
          children: ['introducing the SVG icons on GitHub'],
        },
        '. One thing that inspired me there was the small example of code they provided:',
      ],
    },
    {
      type: 'pre',
      children: '<%= octicon(:symbol => "plus") %>\n',
    },
    {
      type: 'p',
      children: ['My goal has become to have something as simple as that.'],
    },
    {
      type: 'p',
      children: ['Since a lot of our front-end code is written in Django, this was the first place I turned to. Fortunately, adding a template tag is quite easy - this is the end result:'],
    },
    {
      type: 'pre',
      children: '{% icon "custom-icons/data_science" size="1em"  %}\n',
    },
    {
      type: 'p',
      children: ['The template tag itself is only a few short lines of code, with some basic attribute handling!'],
    },
    {
      type: 'p',
      children: [
        'That was quick, but it\'s not where the problem lies. A part of our code is written in ',
        {
          type: 'a',
          props: {
            href: 'https://facebook.github.io/react/',
          },
          children: ['React'],
        },
        ', so it only made sense to have an appropriate component there. That component would only render the icon that was needed, so including all of the icons in a sprite form was out of question. And so as the React components are rendered on the client side, I needed to have a way of including the SVG icons in the script bundle.',
      ],
    },
    {
      type: 'h3',
      children: ['The search for an existing tool'],
    },
    {
      type: 'p',
      children: [
        'Beacuse we\'re using Webpack for bundling, I had an idea of using one of the existing Webpack loaders; an example of such a tool is ',
        {
          type: 'a',
          props: {
            href: 'https://www.npmjs.com/package/react-svg-loader',
          },
          children: ['react-svg-loader'],
        },
        '. However, after giving it some thought, I decided not to use the loaders for a couple of reasons:',
      ],
    },
    {
      type: 'ul',
      children: [
        {
          type: 'li',
          children: ['They are import-driven. What I wanted instead of having one import per icon was to have the one icon component to rule them all.'],
        },
        {
          type: 'li',
          children: [
            'We\'re using ',
            {
              type: 'a',
              props: {
                href: 'https://github.com/zeit/next.js/',
              },
              children: ['Next.js'],
            },
            ' that does not support Webpack loaders completely:',
            {
              type: 'blockquote',
              children: [
                {
                  type: 'p',
                  children: [
                    'Warning: Adding loaders to support new file types (css, less, svg, etc.) is not recommended because only the client code gets bundled via webpack and thus it won\'t work on the initial server rendering.',
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'li',
          children: [
            'Bundler lock-in. While we\'re using mostly ',
            {
              type: 'a',
              props: {
                href: 'https://webpack.js.org/',
              },
              children: ['Webpack'],
            },
            ', this approach would require another plugin for e.g. ',
            {
              type: 'a',
              props: {
                href: 'https://github.com/rollup/rollup',
              },
              children: ['Rollup'],
            },
            '. We\'re not really planning on using Rollup (it\'s just not the right use case), but I wanted to have a more universal tool that I could later use in other projects.',
          ],
        },
      ],
    },
    {
      type: 'p',
      children: [
        'The best alternative seemed to be using a Babel plugin instead. Following the advice given in the Next.js README, I checked out ',
        {
          type: 'a',
          props: {
            href: 'https://www.npmjs.com/package/babel-plugin-inline-react-svg',
          },
          children: ['babel-plugin-inline-react-svg'],
        },
        '. While this coveres Next.js, is universal (at least as universal as Babel is), and optimizes images on the fly, it is also import-driven - so I ruled it out. In the end I couldn\'t find a plugin that I would be ok with, so I set out to create one.',
      ],
    },
    {
      type: 'h3',
      children: ['Well, there it is'],
    },
    {
      type: 'p',
      children: [
        'I won\'t go through the details of ',
        {
          type: 'a',
          props: {
            href: 'https://github.com/fatfisz/babel-plugin-jsx-svg-inject',
          },
          children: ['the implementation'],
        },
        ', but I\'ve created a ',
        {
          type: 'a',
          props: {
            href: 'https://www.npmjs.com/package/babel-plugin-jsx-svg-inject',
          },
          children: ['plugin'],
        },
        ' that allows me to do just what I wanted:',
      ],
    },
    {
      type: 'pre',
      children: 'import Icon from \'components/icon\';\n\nfunction NiceIcons() {\n  return (\n    <div>\n      <Icon svgName="path/to/icon" />\n      <Icon svgName="path/to/another-icon" />\n    </div>\n  );\n}\n',
    },
    {
      type: 'p',
      children: [
        'The plugin searches for a specific prop (by default it\'s ',
        {
          type: 'code',
          children: 'svgName',
        },
        ') and inlines an appropriate image file based on it. Starting with the version 5.0.0 the source of the image is transformed into JSX. There\'s also the "unwrapping" mode which more or less turns this:',
      ],
    },
    {
      type: 'pre',
      children: '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">\n  <rect x="10" y="10" width="100" height="100" />\n</svg>\n',
    },
    {
      type: 'p',
      children: ['into this:'],
    },
    {
      type: 'pre',
      children: '<Icon\n  xmlns="http://www.w3.org/2000/svg"\n  width="120"\n  height="120"\n  viewBox="0 0 120 120"\n  svgContents={<rect x="10" y="10" width="100" height="100" />}\n/>\n',
    },
    {
      type: 'p',
      children: [
        'It makes handling the props on the root level a bit easier (instead of using ',
        {
          type: 'code',
          children: 'React.cloneElement',
        },
        ').',
      ],
    },
    {
      type: 'p',
      children: [
        'All in all, creating a Babel plugin is fun! The ',
        {
          type: 'a',
          props: {
            href: 'https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md',
          },
          children: ['recommended guide'],
        },
        ' is quite extensive and additionally covers some trip-up scenarios.',
      ],
    },
    {
      type: 'p',
      children: ['For now the plugin is used on this very page and in some places on the Codility website. I hope you find it useful too! If you try it out, you\'re most welcome to share some feedback about it.'],
    },
  ],
};
