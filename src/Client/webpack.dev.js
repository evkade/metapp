import path from 'path';
import { merge } from 'webpack-merge'; 
import common from './webpack.common.js';

export default merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(path.resolve(), "dist")
        },
        port: 8080
    }
})