const elixir = require('laravel-elixir');

elixir.config.sourcemaps = true;

elixir(function (mix) {
    mix.less('app.less');
    mix.less('print.less');
    mix.webpack('index.jsx');
});
