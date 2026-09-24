<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('intake_responses', function (Blueprint $table) {
            $table->id();
            $table->string('study_id');
            $table->enum('fear_type', ['spider', 'height']);
            $table->integer('suds_score');
            $table->string('severity_band');
            $table->text('trigger_text')->nullable();
            $table->json('demographics')->nullable();
            $table->boolean('excluded')->default(false);
            $table->timestamps();

            $table->index('study_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('intake_responses');
    }
};
