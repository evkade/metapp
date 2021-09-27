import path from 'path'; 

const loaders = []; 

loaders.push({
    // tests: /\.jsx?$/,
    exclude: /node_modules/,
    use: 'babel-loader'
})

loaders.push({
        test: /\.css$/,
        // the order of `use` is important!
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
})

export default {
    entry: {
        app: './src/app.jsx'
    },
    resolve: {
        alias: {
          components: path.resolve(path.resolve(), '/components'),
        },
        extensions: ['.js', '.jsx'],
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