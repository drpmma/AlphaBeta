module.exports = {
    pages: {
        index: {
          // entry for the page
          entry: 'src/client/main.js',
          // the source template
          template: 'public/index.html',
          // output as dist/index.html
          filename: 'index.html'
        }
    },
    devServer: {
        proxy: 'http://localhost:4000'
    }
}
