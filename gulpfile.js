

var gulp        = require("gulp")
  , gutil       = require("gulp-util")
  , clean       = require("gulp-clean")
  , plumber     = require("gulp-plumber") 
  , watch       = require("gulp-watch")
  , connect     = require("gulp-connect")
  , livereload  = require("gulp-livereload")
  
  , sass        = require("gulp-sass")
  , autoprefix  = require("gulp-autoprefixer")
  , imports     = require("gulp-imports")
  , jshint      = require("gulp-jshint")
  , jade        = require("gulp-jade")
  , stylish     = require("jshint-stylish")

  , uglify      = require("gulp-uglify")
  , uncss       = require("gulp-uncss")
  , cssmin      = require("gulp-cssmin")
  , htmlmin     = require("gulp-minify-html")
  , imagemin    = require("gulp-imagemin")

  , devpath     = "app/dev/"
  , buildpath   = "app/build/"

  , paths = {
      dev: {
          js:           devpath + "js/"
        , css:          devpath + "css/"
        , jsfiles:      devpath + "js/partials/**/*.js"
        , cssfiles:     devpath + "css/*.css"
        , scssfiles:    devpath + "scss/**/*.scss"
        , fontfiles:    devpath + "fonts/**/*"
        , jadefiles:    devpath + "jade/*.jade"
        , jadepartials: devpath + "jade/**/*.jade"
        , imagesfiles:  devpath + "imgs/**/*"
      }
      , build: {
          js:    buildpath + "js/"
        , css:   buildpath + "css/"
        , imgs:  buildpath + "imgs/"
        , fonts: buildpath + "fonts/"
      }
  }
  ;



// dev tasks

gulp.task("dev-html", function() {

  var opts = {pretty: true}

  gulp.src(devpath + "*.html")
      .pipe(clean({force: true}))
      ;

  gulp.src(paths.dev.jadefiles)
      .pipe(plumber())
      .pipe(jade(opts))
      .pipe(gulp.dest(devpath))
      .pipe(connect.reload())
      ;

});

gulp.task("dev-css", function() {

  var opts = { style: "expanded" };

  gulp.src(paths.dev.scssfiles)
      .pipe(plumber())
      .pipe(sass(opts))
      .pipe(autoprefix("last 2 versions", "> 1%", "Explorer 7", "Android 2"))
      .pipe(gulp.dest(paths.dev.css))
      .pipe(connect.reload())
      ;

});

gulp.task("dev-js", function(){

  gulp.src(paths.dev.js + "partials/app.js")
    .pipe(imports())
    .pipe(gulp.dest(paths.dev.js))
    ;

  gulp.src(paths.dev.jsfiles)
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"))
      .pipe(connect.reload())
      ;

});

gulp.task("dev-connect", connect.server({

  root: [devpath],
  port: 1337,
  livereload: true,
  open: {
    browser: "Google Chrome"
  }

}));

gulp.task("dev-watch", function() {

  gulp.watch(paths.dev.jadepartials, ["dev-html"]);
  gulp.watch(paths.dev.scssfiles,    ["dev-css"]);
  gulp.watch(paths.dev.jsfiles,      ["dev-js"]);

});



// build tasks

gulp.task("pre-build", function(){

  gulp.src(buildpath + "**/*", {read: false})
      .pipe(clean({force: true}))
      ;

  gulp.src(buildpath, {read: false})
      .pipe(clean({force: true}))
      ;

});

gulp.task("build-html", function() {

  gulp.src(devpath + "*.html")
    .pipe(htmlmin())
    .pipe(gulp.dest(buildpath))
    ;

});

gulp.task("build-css", function(){

  var opts = { html: [buildpath + "index.html"] };

  gulp.src(paths.dev.cssfiles)
      .pipe(uncss(opts))
      .pipe(cssmin())
      .pipe(gulp.dest(paths.build.css))
      ;

});

gulp.task("build-js", function(){

  var opts = {}

  gulp.src(paths.dev.js + "app.js")
      .pipe(uglify(opts))
      .pipe(gulp.dest(paths.build.js))
      ;

});

gulp.task("build-imgs", function() {

  gulp.src(paths.dev.imagesfiles)
      .pipe(imagemin())
      .pipe(gulp.dest(paths.build.imgs));

});

gulp.task("build-fonts", function() {

  gulp.src(paths.dev.fontfiles)
      .pipe(gulp.dest(paths.build.fonts));

});



// tasks

gulp.task("build",   ["pre-build", "build-html", "build-css", "build-js", "build-imgs", "build-fonts"]);
gulp.task("default", ["dev-html", "dev-css", "dev-js", "dev-connect", "dev-watch"]);

