<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/slug/{slug}', [PostController::class, 'getBySlug']);
Route::get('/posts/{post}', [PostController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    Route::apiResource('posts', PostController::class)->except(['index', 'show']);
    Route::patch('/posts', [PostController::class, 'update']);
    Route::delete('/posts', [PostController::class, 'destroy']);
    
    Route::get('/my-posts', [PostController::class, 'myPosts']);
});