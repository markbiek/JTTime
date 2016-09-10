<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('login', 'Auth\LoginController@showLoginForm');
Route::post('login', 'Auth\LoginController@login');
Route::get('logout', 'Auth\LoginController@logout');

Route::get('/invoice/{tag}', 'InvoiceController@viewInvoice');
Route::get('/', 'HomeController@index');

Route::get('/api/tasks', 'ApiController@tasks');
Route::get('/api/companies', 'ApiController@companies');

Route::post('/api/tasks/add', 'ApiController@storeTask');
Route::post('/api/tasks/delete', 'ApiController@deleteTask');
