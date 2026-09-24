<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('video_assets', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('phobia_type', ['spider', 'height']);
            $table->enum('severity_band', ['low', 'medium', 'high']);
            $table->enum('counterbalance_group', ['A', 'B']);
            $table->string('file_path');
            $table->string('thumbnail_path')->nullable();
            $table->integer('duration_seconds')->nullable();
            $table->boolean('supports_overlay')->default(false);
            $table->integer('overlay_start_time')->nullable();
            $table->integer('overlay_end_time')->nullable();
            $table->enum('status', ['draft', 'active'])->default('draft');
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('video_assets');
    }
};
