<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('employees/getall', [ApiController::class, 'getAllEmployees' ]);
Route::get('employees/get/{id}', [ ApiController::class, 'getEmployee' ]);
Route::post('employees/create', [ ApiController::class, 'createEmployee' ]);
Route::put('employees/update/{id}', [ ApiController::class, 'updateEmployee' ]);
Route::delete('employees/delete/{id}', [ ApiController::class, 'deleteEmployee' ]);
Route::get('employees/search/{name}', [ ApiController::class, 'searchByName' ]);

Route::get('rfid/getall', [ApiController::class, 'getAllData' ]);