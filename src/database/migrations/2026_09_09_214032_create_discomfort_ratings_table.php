<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('discomfort_ratings', function (Blueprint $table) {
            $table->id();
            $table->string('study_id');
            $table->enum('stage', ['pre', 'post']);
            $table->integer('rating_value');
            $table->timestamps();

            $table->index('study_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('discomfort_ratings');
    }
};
