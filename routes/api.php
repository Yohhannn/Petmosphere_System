<?php

use App\Http\Controllers\AdoptionRequestController;
use App\Http\Controllers\BreedController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RequestHistoryController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

    Route::post('/Admin', [AdminController::class, 'createAdmin']);
    Route::get('/Admin', [AdminController::class, 'getAllAdmin']);
    Route::get('/Admin/{id}', [AdminController::class, 'getAdminById']);
    Route::put('/Admin/{id}', [AdminController::class, 'updateAdmin']);
    Route::delete('/Admin/{id}', [AdminController::class, 'deleteAdmin']);

    Route::get('/Type', [TypeController::class, 'getAllType']);
    Route::get('/Type/{id}', [TypeController::class, 'getTypeById']);
    Route::post('/Type', [TypeController::class, 'createType']);
    Route::put('/Type/{id}', [TypeController::class, 'updateType']);
    Route::delete('/Type/{id}', [TypeController::class, 'deleteType']);


    Route::get('/Post', [PostController::class, 'getAllPost']);
    Route::get('/Post/{id}', [PostController::class, 'getPostById']);
    Route::get('/Post/User/{id}', [PostController::class, 'getPostByUserId']);
    Route::post('/Post', [PostController::class, 'createPost']);
    Route::put('/Post/{id}', [PostController::class, 'updatePost']);
    Route::delete('/Post/{id}', [PostController::class, 'deletePost']);

    Route::get('/User', [UserController::class, 'getAllUser']);
    Route::get('/User/{id}', [UserController::class, 'getUserById']);
    Route::put('/User/{id}', [UserController::class, 'updateUser']);
    Route::delete('/User/{id}', [UserController::class, 'deleteUser']);

    Route::get('/AdoptionRequest', [AdoptionRequestController::class, 'getAllAdoptionRequest']);
    Route::get('/AdoptionRequest/{id}', [AdoptionRequestController::class, 'getAdoptionRequestById']);
    Route::get('/AdoptionRequest/user/{id}', [AdoptionRequestController::class, 'getAdoptionRequestByUserId']);
    Route::post('/AdoptionRequest', [AdoptionRequestController::class, 'createAdoptionRequest']);
    Route::put('/AdoptionRequest/{id}', [AdoptionRequestController::class, 'updateAdoptionRequest']);
    Route::put('/AdoptionRequest/update/{id}', [AdoptionRequestController::class, 'updateAdoptionRequestView']);
    Route::put('/AdoptionRequest/update/status/{id}', [AdoptionRequestController::class, 'updateAdoptionRequestStatus']);
    Route::delete('/AdoptionRequest/{id}', [AdoptionRequestController::class, 'deleteAdoptionRequest']);

    Route::get('/Breed', [BreedController::class, 'getAllBreed']);
    Route::get('/Breed/{id}', [BreedController::class, 'getBreedById']);
    Route::post('/Breed', [BreedController::class, 'createBreed']);
    Route::put('/Breed/{id}', [BreedController::class, 'updateBreed']);
    Route::delete('/Breed/{id}', [BreedController::class, 'deleteBreed']);

    Route::get('/Message', [MessageController::class, 'getAllMessage']);
    Route::get('/Message/{id}', [MessageController::class, 'getMessageById']);
    Route::post('/Message', [MessageController::class, 'createMessage']);
    Route::put('/Message/{id}', [MessageController::class, 'updateMessage']);
    Route::delete('/Message/{id}', [MessageController::class, 'deleteMessage']);

    Route::get('/Review', [ReviewController::class, 'getAllReview']);
    Route::get('/Review/{id}', [ReviewController::class, 'getReviewById']);
    Route::get('/Review/User/{id}', [ReviewController::class, 'getReviewByUserId']);
    Route::post('/Review', [ReviewController::class, 'createReview']);
    Route::put('/Review/{id}', [ReviewController::class, 'updateReview']);
    Route::delete('/Review/{id}', [ReviewController::class, 'deleteReview']);

    Route::get('/Pet', [PetController::class, 'getAllPet']);
    Route::get('/Pet/{id}', [PetController::class, 'getPetById']);
    Route::post('/Pet', [PetController::class, 'createPet']);
    Route::put('/Pet/{id}', [PetController::class, 'updatePet']);
    Route::delete('/Pet/{id}', [PetController::class, 'deletePet']);

    Route::get('/RequestHistory', [RequestHistoryController::class, 'getAllRequestHistory']);
    Route::get('/RequestHistory/{id}', [RequestHistoryController::class, 'getRequestHistoryById']);
    Route::post('/RequestHistory', [RequestHistoryController::class, 'createRequestHistory']);
    Route::put('/RequestHistory/{id}', [RequestHistoryController::class, 'updateRequestHistory']);
    Route::delete('/RequestHistory/{id}', [RequestHistoryController::class, 'deleteRequestHistory']);


    Route::post('/logout', [LoginController::class, 'logout']);

    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/User', [UserController::class, 'createUser']);
    Route::post('/AdoptionRequest/verify', [AdoptionRequestController::class, 'CheckAdoption']);





