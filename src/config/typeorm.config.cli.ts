import { LoaderEnv } from './loader';

const config = {
  ...LoaderEnv.getTypeOrmConfig(),
};
console.dir(config, { colors: true, depth: null });
module.exports = config;
