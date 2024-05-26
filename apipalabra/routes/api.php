<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PalabrasController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\RecordsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('palabras', PalabrasController::class);
Route::apiResource('usuario', UsuarioController::class);
Route::post('sendDifficulty', [PalabrasController::class, 'sendDifficulty']);
Route::apiResource('record', RecordsController::class);
Route::post('login', [UsuarioController::class, 'login']);