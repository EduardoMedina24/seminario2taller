<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_jug');
            $table->string('nivel_juego');
            $table->integer('duracione');
            $table->timestamps(); 
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('records');
    }
};
