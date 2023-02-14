const { src, dest } = require('gulp')

const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const gulpPug = require('gulp-pug')

const path = require('../config/path.js')

const pug = () => {
    return src(path.pug.src)
        .pipe(plumber({
            errorHandler: notify.onError()
        }))
        .pipe(gulpPug({
            pretty: true,
            data: {
                slots: require('../data/slots.json'),
                bonuses: require('../data/bonuses.json')
            }
        }))
        .pipe(dest(path.pug.dest))
}

module.exports = pug