const { src, dest } = require('gulp')

const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const imageMin = require('gulp-imagemin')
const newer = require('gulp-newer')


const path = require('../config/path.js')

const img = () => {
    console.log(path.img.src);
    return src(path.img.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'Image',
                message: error.message
            }))
        }))
        .pipe(newer(path.img.dest))
        // .pipe(imageMin({
        //     verbose: true
        // }))
        .pipe(dest(path.img.dest))
}

module.exports = img