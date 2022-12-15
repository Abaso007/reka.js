import path from 'path';

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default function createRollupConfig(config) {
  return {
    input: config.input || './src/index.ts',
    output: config.output || [],
    external: (id) => {
      if (config.external) {
        return config.external(id);
      }

      return !id.startsWith('.') && !path.isAbsolute(id);
    },
    plugins: Array.from(
      new Set([
        commonjs(),
        nodeResolve(),
        typescript(),
        ...(config.plugins || []),
      ])
    ),
  };
}
