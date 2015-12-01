var elixir = require('laravel-elixir');
var gulp = require('gulp');
var rimraf = require('rimraf');
var config = elixir.config;

// Configure paths
config.assetsPath = 'src';

var paths = {
  'include': {
    'bootstrap': 'node_modules/bootstrap-sass/assets/stylesheets/'
  },
 'output': {
    // Define outputh paths
    js: config.publicPath + '/js',
    translipedJs: config.assetsPath + '/tmp/js'
  }
};


// Clean temp directory
gulp.task('clean-temp', function (cb) {
  rimraf('./' + config.assetsPath + '/src/tmp/', cb);
});


elixir(function(mix) {

  // Normalize.css - this way it's easier to update if needed
  mix.copy(
    'node_modules/normalize.css/normalize.css',
    'src/sass/_normalize.scss'
  )
    // Copy Velocity libs to simplify imports in javascript
    .copy('node_modules/velocity-animate/velocity.min.js', 'src/js/lib/velocity.min.js')
    .copy('node_modules/velocity-animate/velocity.ui.min.js', 'src/js/lib/velocity-ui.min.js')

    // Copy noUISlider stylesheet
    .copy(
      'node_modules/nouislider/distribute/nouislider.min.css',
      'src/sass/_nouislider.scss'
    )

    // Copy index.html
    .copy(
      config.assetsPath + '/index.html',
      config.publicPath + '/index.html'
    );

  /*
  // Copy fonts
  mix.copy(
    'resources/assets/fonts',
    pathPrefix + 'assets/fonts'
  );
  */

  mix.sass('main.scss');


  // Transpile scripts
  /*mix.babel([
    'main.js'
  ], paths.output.js);
*/

  // Compile transpiled scripts
  //mix.browserify('../tmp/js/all.js');
  mix.browserify('main.js', paths.output.js + '/app.js');

  // Clean Twig cache
  // mix.task('clean-cache', './resources/views/**/*');

  // Browser sync
  if (!config.production) {
    mix.browserSync({
      proxy: null,
      server: {
        baseDir: './public'
      }
    });
  }
});
