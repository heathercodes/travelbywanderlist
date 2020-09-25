const path = require('path');

module.exports = {
    outputPath: path.resolve('dist'),
    entryPath: path.resolve('src/index.tsx'),
    templatePath: path.resolve('src/index.html'),
    imagesFolder: 'images',
    styles: path.resolve('src/index.scss'),
};
