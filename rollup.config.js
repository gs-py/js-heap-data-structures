import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
    // CommonJS build
    {
        input: 'index.js',
        output: {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            exports: 'named'
        },
        plugins: [
            resolve(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            })
        ]
    },
    // ES Module build
    {
        input: 'index.js',
        output: {
            file: 'dist/index.esm.js',
            format: 'es'
        },
        plugins: [
            resolve(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            })
        ]
    },
    // UMD build for browsers
    {
        input: 'index.js',
        output: {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'HeapDataStructures',
            exports: 'named'
        },
        plugins: [
            resolve(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            }),
            terser()
        ]
    }
];