const path = require('path');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = {
    target: 'node',

    resolve: {
        extensions: ['.ts', '.tsx', 'node'],
        modules: ['./node_modules']
    },

    entry: {
        server: [
            './server/server.ts'
        ],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/\.spec\.ts$/, path.resolve(__dirname, '../node_modules')],
                loader: '@ngtools/webpack'
            }
        ]
    },

    externals: function checkNodeImport(context, request, cb) {
        if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
            cb(null, 'commonjs ' + request); return;
        }
        cb();
    },
    plugins: [
        new AngularCompilerPlugin({
            mainPath: 'main.ts',
            tsConfigPath: 'src/tsconfig.app.json',
            skipCodeGeneration: true
        })
    ],
    node: {
        child_process: 'empty',
        global: true,
        __dirname: false,
        __filename: false,
        process: true,
        Buffer: true
    },

    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
};
