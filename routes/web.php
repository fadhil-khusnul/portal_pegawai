<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataPegawaiTiranController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('data-pegawai', [DataPegawaiTiranController::class, 'index'])->name('dataPegawai.index');
Route::post('data-pegawai', [DataPegawaiTiranController::class, 'store'])->name('dataPegawai.store');
Route::delete('data-pegawai/{dataPegawaiTiran}', [DataPegawaiTiranController::class, 'destroy'])->name('dataPegawai.destroy');
Route::get('data-pegawai/{dataPegawaiTiran}', [DataPegawaiTiranController::class, 'show'])->name('dataPegawai.show');
Route::put('data-pegawai/{dataPegawaiTiran}', [DataPegawaiTiranController::class, 'update'])->name('dataPegawai.update');
Route::middleware(['auth'])->group(function () {
    // Route::resource('data-pegawai', DataPegawaiTiranController::class);

    Route::get('dashboard', [DataPegawaiTiranController::class, 'index'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
