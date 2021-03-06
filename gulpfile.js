const config = require('./webpack.config.js');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const path = require('path');
const pump = require('pump');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const webpack = require('gulp-webpack');


gulp.task('webpack', function(cb){
  pump([
    gulp.src('src/js/main.js'),
    webpack(config),
    gulp.dest('public')
  ],cb);
});

gulp.task('scss', function(cb){
  pump([
    gulp.src('src/scss/main.scss'),
    sass(),
    rename('style.css'),
    gulp.dest('./public/css')
  ],cb);
});

gulp.task('default', ['webpack', 'scss'], function(cb){
  return nodemon({
    delay: 10,
    ignore: ['public/**/*.*'],
    scripts: {
      start: 'node app.js'
    },
    tasks(changedFiles){
      const tasks = [];
      for(let file of changedFiles){
        if(path.extname(file) === '.js' || path.extname(file) === '.vue')
          tasks.push('webpack');
        if(path.extname(file) === '.scss')
          tasks.push('scss');
      }
      return tasks;
    },
    watch: '**/*.*'
  });
});
