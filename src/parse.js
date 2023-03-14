import yaml from 'js-yaml';
import path from 'path';

export default (data) => {
  const extension = path.extname(data);

  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);

    default:
      throw new Error(`'Unknown format! ${data}'`);
  }
};
