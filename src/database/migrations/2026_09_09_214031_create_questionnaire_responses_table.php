<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('questionnaire_responses', function (Blueprint $table) {
            $table->id();
            $table->string('study_id');
            $table->foreignId('item_id')->constrained('questionnaire_items')->cascadeOnDelete();
            $table->integer('likert_value');
            $table->timestamps();

            $table->index('study_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questionnaire_responses');
    }
};
