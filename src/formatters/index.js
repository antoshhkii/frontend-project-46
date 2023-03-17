import stylish from './stylish.js';
import plain from './plain.js';

export default (tree, formatName = 'stylish') => {
  switch (formatName) {
    case 'plain':
      return plain(tree);
    case 'stylish':
      return stylish(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(
        `The ${formatName} format is supported.\n supported formats: stylish, plain, json`,
      );
  }
};
