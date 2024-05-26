<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('palabra_id')->constrained(); // Suponiendo que 'palabra_id' es una clave foránea
            $table->string('dificultad');
            $table->integer('tiempo');
            $table->foreignId('user_id')->constrained(); // Suponiendo que 'user_id' es una clave foránea
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('records');
    }
};