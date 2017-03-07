var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
        pattern: '*'
    });
var argv = require('yargs').argv;
var fs = require('fs');

// Get Current Working Directory
var path = require('path');
//  we need this value                         we're here
//       v                                         v
// /project-name/public_html/theme/base-2016_dev/source
var cwd = process.cwd().split(path.sep).reverse()[4];

// Check for --production flag
var isProduction = !!(argv.production);

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// Favicon generator settings
// File where the favicon markups are stored
var faviconDataFile = 'faviconData.json';
var faviconBrandColor = '#5bbad5';
var faviconBgColor = '#fff';
var faviconSiteName = 'Bolt';

// File paths to various assets are defined here.
var PATHS = {
  //assets: [
  //  'src/assets/**/*',
  //  '!src/assets/{img,js,scss}/**/*'
  //],
  // sass: [
  //   'bower_components/foundation-sites/scss',
  //   'bower_components/motion-ui/src/'
  // ],
  javascript: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
    'js/**/!(app).js',
    'js/app.js'
  ]
};

// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('app.min.js'))
    .pipe(uglify)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('../js'))
    .pipe($.browserSync.stream());
});

// Compile Theme Sass into CSS.
// In production, the file is minified
gulp.task('theme-sass', function() {

  var minifycss = $.if(isProduction, $.cleanCss());

  return gulp.src('scss/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(minifycss)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('../css'))
    .pipe($.browserSync.stream());
});

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the favicon-update task below).
gulp.task('favicon-generate', function(done) {
    $.realFavicon.generateFavicon({
        masterPicture: '../images/favicon.png',
        dest: '../images/favicons/',
        iconsPath: '/theme/base-2016_dev/images/favicons/',
        design: {
            ios: {
                pictureAspect: 'backgroundAndMargin',
                backgroundColor: faviconBgColor,
                margin: '14%',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'whiteSilhouette',
                backgroundColor: faviconBrandColor,
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'shadow',
                themeColor: faviconBgColor,
                manifest: {
                    name: faviconSiteName,
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'silhouette',
                themeColor: faviconBrandColor
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        markupFile: faviconDataFile
    }, function() {
        done();
    });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('favicon-inject', ['favicon-generate'], function() {
    gulp.src(['../partials/_favicons.twig'])
        .pipe($.realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(faviconDataFile)).favicon.html_code))
        .pipe(gulp.dest('../partials/'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('favicon-update', function(done) {
    var currentVersion = JSON.parse(fs.readFileSync(faviconDataFile)).version;
    $.realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err;
        }
    });
});

// Build the "dist" folder by running all of the above tasks
gulp.task('build', ['javascript', 'theme-sass']);

gulp.task('default', function() {
  $.browserSync.init({
    port: 3000,
    proxy: {
      target: 'http://'+cwd+'.dev/'
    },
    open: false
  });
  gulp.watch(['scss/**/*.scss'], ['theme-sass'], $.browserSync.reload);
  gulp.watch(['js/**/*.js'], ['javascript'], $.browserSync.reload);
  gulp.watch(['../**/*.twig'], $.browserSync.reload);
});
