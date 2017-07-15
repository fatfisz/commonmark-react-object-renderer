'use strict';

module.exports = {
  renderers: {
    code_block({ info, literal }) {
      return JSON.stringify({ info, literal });
    },
  },
};
