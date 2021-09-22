import path from 'path'; 

const loaders = []; 

loaders.push({
    // tests: /\.jsx?$/,
    exclude: /node_modules/,
    use: 'babel-loader'
})

export default {
    entry: {
        app: './src/app.jsx'
    },
    module: {
        rules: loaders
    },
    output: {
        filename: 'main.bundle.js',
        // dist is all the code that we want the browser to be able to reach 
        // join: combine two strings into a path
        // resolve: give the current path that you are in
        path: path.resolve(path.resolve(), 'dist')
    }
}