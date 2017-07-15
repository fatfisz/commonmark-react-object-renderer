'use strict';

module.exports = {
  type: 'div',
  children: {
    type: 'p',
    children: {
      type: 'a',
      props: {
        href: 'foo',
      },
    },
  },
};
