<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('admin')->middleware('guest')->get('login', 'AuthController@index');
Route::prefix('admin')->post('login', 'AuthController@login');

Route::prefix('admin')->middleware('auth')->post('upload', 'AdminController@import');
Route::prefix('admin')->middleware('auth')->post('change-password', 'AuthController@changePassword');
Route::prefix('admin')->middleware('auth')->get('logout', 'AuthController@logout');
Route::prefix('admin')->middleware('auth')->get('/', 'AdminController@index');
Route::prefix('admin')->middleware('auth')->get('/get-file-list', 'AdminController@getFilesJson');

Route::get('/', 'ResultController@index');
Route::get('/get-score', 'ResultController@getResult');
