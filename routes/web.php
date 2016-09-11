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

Route::get('/api/companies', 'ApiController@companies');

Route::get('/api/tasks', 'ApiController@tasks');
Route::post('/api/tasks/add', 'ApiController@storeTask');
Route::post('/api/tasks/delete', 'ApiController@deleteTask');

Route::get('/api/invoices', 'ApiController@invoices');
Route::post('/api/invoices/add', 'ApiController@storeInvoice');
Route::post('/api/invoices/delete', 'ApiController@deleteInvoice');
