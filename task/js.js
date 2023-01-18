const { src, dest } = require('gulp')

const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const path = require('../config/path.js')

const js = () => {
    return src(path.js.src, { sourcemaps: true })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'JavaScript',
                message: error.message
            }))
        }))
        //.pipe(babel())
        //.pipe(uglify())
        .pipe(dest(path.js.dest), { sourcemaps: '.' })
}

module.exports = js