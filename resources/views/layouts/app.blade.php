<?php
use Illuminate\Support\Facades\Route;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', '') }}</title>

    <link rel="stylesheet" href="/css/app.css">

    <!-- Scripts -->
    <script src="https://use.fontawesome.com/571406dd14.js"></script>
    <script>
        window.Laravel = 
<?php
echo json_encode([ 'csrfToken' => csrf_token(), ]);
?>
    </script>
</head>
<body class="{{ Route::currentRouteName() }}">
<div class="section">
    <div class="container">
        <div class="columns">
            <div class="column is-half is-offset-one-quarter">
                <nav class="navbar" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="{{ url('/') }}">{{ config('app.name', 'Laravel') }}</a>

                        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div class="navbar-menu" id="navMenu">
                        <div class="navbar-end">
                            <a class="navbar-item" href="{{ url('/logout') }}">Logout</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</div>
    @yield('content')

    <!-- Scripts -->
    <script src="/js/bundle.js"></script>
</body>
</html>
