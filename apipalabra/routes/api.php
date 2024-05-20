<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PalabrasController;
use App\Http\Controllers\recodsController;

Route::controller(recodsController::class)->group(function(){
    Route::get('/records', 'index');
    Route::get('/record/{id}', 'show');
    Route::post('/record', 'store');
    Route::put('/record/{id}', 'update');
    Route::delete('/records/{id}', 'destroy');
});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('palabras', PalabrasController::class);