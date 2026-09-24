<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matching_rules', function (Blueprint $table) {
            $table->id();
            $table->enum('fear_type', ['spider', 'height']);
            $table->enum('severity_band', ['low', 'medium', 'high']);
            $table->foreignId('video_asset_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['fear_type', 'severity_band']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matching_rules');
    }
};
