import path from 'path'; 

const loaders = []; 

loaders.push({
    // tests: /\.jsx?$/,
    exclude: /node_modules/,
    use: 'babel-loader'
})

export default {
    entry: {
        app: './app.jsx'
    },
    module: {
        rules: loaders
    },
    output: {
        filename: 'main.bundle.js',
        // dist is all the code that we want the browser to be able to reach 
        path: path.resolve(path.resolve(), 'dist')
    }
}