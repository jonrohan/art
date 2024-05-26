// rollup.config.js
import {nodeResolve} from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { globSync } from 'glob'
import { fileURLToPath } from 'node:url'

const baseConfig = {
  treeshake: false,
  plugins: [nodeResolve(), typescript()],
  external: ['p5']
}

export default globSync('sketches/**/*.ts').map(file => {
    const inputFile = fileURLToPath(new URL(file, import.meta.url))
    return {
      ...baseConfig,
      input: inputFile,
      output: {
        file: inputFile.replace(/\.ts$/, '.js'),
        format: 'esm',
      },
    }
  }
)