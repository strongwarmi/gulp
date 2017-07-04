var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browsrify');
var rename = require('gulp-rename');
var config = {
    source: './src/',
    dist: './public'
};
var paths = {
    assets: "assets/",
    html: "**/*.html",
    sass: "scss/**/*.scss",
    mainSass: "scss/main.scss",
    mainJS: "js/app.js"
};
var sources = {
    assets: config.source + paths.assets,
    html: config.source + paths.html,
    sass: paths.assets + paths.sass,
    js: config.source + paths.js,
    rootSass: config.source + paths.assets + paths.mainSass,
    rootJS: config.source + paths.assets + paths.mainJS
};
gulp.task('html', () => {
    gulp.src(sources.html).pipe(gulp.dest(config.dist));
});
gulp.task('sass', () => {
    gulp.src(sources.rootSass).pipe(sass({
        outputStyle: "compressed"
    }).on("error", sass.logError)).pipe(gulp.dest(config.dist + "/" + paths.assets + "css"));
});
gulp.task("js", function(){
    gulp.src(sources.rootJS)
        .pipe(browserify())
        .pipe(rename("bundle.js"))
        .pipe(gulp.dest(config.dist + paths.assets + "js"));
});