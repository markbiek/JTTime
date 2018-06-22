@extends('layouts.app')

@section('content')
<div class="section">
    <div class="container">
        <div class="columns">
            <div class="column is-half is-offset-one-quarter">
                <form class="form-horizontal" role="form" method="POST" action="{{ url('/login') }}">
                    {{ csrf_field() }}

                    <div class="field">
                        <label class="label" for="email">Email</label>
                        <p class="control has-icons-left has-icons-right">
                            <input id="email" type="email" class="input" name="email" value="{{ old('email') }}" required autofocus>
                            <span class="icon is-small is-left"><i class="fa fa-envelope"></i></span>
                        </p>
                    </div>
                    <div class="field">
                        <label class="label" for="password">Password</label>
                        <p class="control has-icons-left has-icons-right">
                            <input id="password" type="password" class="input" name="password" value="{{ old('password') }}" required autofocus>
                            <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
                        </p>
                    </div>
                    <div class="field">
                        <label class="checkbox">
                            <input type="checkbox" name="remember"> Remember Me
                        </label>
                    </div>
                    <div class="field">
                        <button type="submit" class="button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
