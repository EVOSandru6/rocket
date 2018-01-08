let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.styles([
    'resources/assets/front/bower_components/bootstrap/dist/css/bootstrap.min.css',
    'resources/assets/front/css/style.css'
], 'public/css/front.css');

mix.scripts([
    'resources/assets/front/bower_components/jquery/dist/jquery.min.js',
    'resources/assets/front/bower_components/bootstrap/dist/js/bootstrap.min.js',
    'resources/assets/front/js/scripts.js'
], 'public/js/front.js');