const elixir = require('laravel-elixir');

elixir.config.sourcemaps = true;

elixir(function (mix) {
    mix.less('app.less');
});
