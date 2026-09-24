<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('open_text_responses', function (Blueprint $table) {
            $table->id();
            $table->string('study_id');
            $table->string('question_key');
            $table->text('response_text');
            $table->timestamps();

            $table->index('study_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('open_text_responses');
    }
};
