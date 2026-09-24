<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('consent_records', function (Blueprint $table) {
            $table->id();
            $table->string('study_id');
            $table->string('consent_version');
            $table->timestamp('timestamp');
            $table->string('contact_email')->nullable();
            $table->text('ip_address')->nullable();
            $table->timestamps();
        });

        Schema::create('consent_record_versions', function (Blueprint $table) {
            $table->id();
            $table->string('version');
            $table->text('content');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consent_records');
        Schema::dropIfExists('consent_record_versions');
    }
};
