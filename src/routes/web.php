<?php

use App\Http\Controllers\Admin\ConsentRecordController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MatchingRuleController;
use App\Http\Controllers\Admin\ResponseController;
use App\Http\Controllers\Admin\VideoController as AdminVideoController;
use App\Http\Controllers\Participant\BookingController;
use App\Http\Controllers\Participant\ConsentController;
use App\Http\Controllers\Participant\DebriefController;
use App\Http\Controllers\Participant\DiscomfortController;
use App\Http\Controllers\Participant\EligibilityController;
use App\Http\Controllers\Participant\ExclusionController;
use App\Http\Controllers\Participant\IntakeController;
use App\Http\Controllers\Participant\LandingController;
use App\Http\Controllers\Participant\ProcessingController;
use App\Http\Controllers\Participant\QuestionnaireController;
use App\Http\Controllers\Participant\VideoController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/landing', LandingController::class)->name('landing');

Route::middleware('participant.token')->name('participant.')->group(function () {
    Route::get('/eligibility', EligibilityController::class)->name('eligibility');
    Route::post('/eligibility', [EligibilityController::class, 'store'])->name('eligibility.store');
    Route::get('/consent', ConsentController::class)->name('consent');
    Route::post('/consent', [ConsentController::class, 'store'])->name('consent.store');
    Route::get('/intake', IntakeController::class)->name('intake');
    Route::post('/intake', [IntakeController::class, 'store'])->name('intake.store');
    Route::get('/processing', ProcessingController::class)->name('processing');
    Route::get('/video', VideoController::class)->name('video');
    Route::get('/discomfort-check', DiscomfortController::class)->name('discomfort');
    Route::post('/discomfort-check', [DiscomfortController::class, 'store'])->name('discomfort.store');
    Route::get('/questionnaire', QuestionnaireController::class)->name('questionnaire');
    Route::post('/questionnaire', [QuestionnaireController::class, 'store'])->name('questionnaire.store');
    Route::get('/booking', BookingController::class)->name('booking');
    Route::get('/debrief', DebriefController::class)->name('debrief');
});

Route::get('/exclusion', ExclusionController::class)->name('exclusion');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
});

Route::middleware(['auth', 'verified'])->get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/videos', [AdminVideoController::class, 'index'])->name('videos.index');
    Route::get('/videos/create', [AdminVideoController::class, 'create'])->name('videos.create');
    Route::post('/videos', [AdminVideoController::class, 'store'])->name('videos.store');
    Route::get('/matching-rules', [MatchingRuleController::class, 'index'])->name('matching-rules.index');
    Route::post('/matching-rules', [MatchingRuleController::class, 'store'])->name('matching-rules.store');
    Route::delete('/matching-rules/{rule}', [MatchingRuleController::class, 'destroy'])->name('matching-rules.destroy');
    Route::get('/responses', [ResponseController::class, 'index'])->name('responses.index');
    Route::get('/responses/export', [ResponseController::class, 'export'])->name('responses.export');
    Route::delete('/responses/{participant}', [ResponseController::class, 'destroy'])->name('responses.destroy');
    Route::get('/consent-records', [ConsentRecordController::class, 'index'])->name('consent-records.index');
    Route::post('/consent-records/{participant}/withdraw', [ConsentRecordController::class, 'withdraw'])->name('consent-records.withdraw');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

