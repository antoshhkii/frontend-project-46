import formatStylish from './stylish.js';

export default (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(
        `The ${formatName} format is supported.\n supported fornmats: stylish, plain, json`,
      );
  }
};
