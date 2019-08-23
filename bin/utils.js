const fs = require('fs');

const toKebabCase = filename => {
  if (!filename) {
    throw new Error('filename is required');
  }
  const [first, ...others] = filename.split('');
  return `${first.toLowerCase()}${others
    .join('')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()}`;
};

module.exports = {
  toKebabCase,
};
