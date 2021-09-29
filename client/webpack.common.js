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

loaders.push({
    test: /\.(png|jpe?g|gif)$/i,
    use: [
        'file-loader',
        {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer  
        }
      },
    ],
})

export default {
    entry: {
        app: './src/app.jsx'
    },
    resolve: {
        alias: {
          components: path.resolve(path.resolve(), '/components'),
          images: path.resolve(path.resolve(), '/components/images')
        },
        extensions: ['.js', '.jsx', '.css'],
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