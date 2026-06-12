<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('make');
            $table->string('model');
            $table->unsignedSmallInteger('year');
            $table->unsignedBigInteger('price'); // in whole euros
            $table->string('power')->nullable();
            $table->string('accel')->nullable();
            $table->string('topspeed')->nullable();
            $table->enum('status', ['available', 'sold'])->default('available');
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
