<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PalabraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $palabras = ['peras', 'limon', 'cirro', 'hongo', 'datil', 'lince', 'mango', 'papal', 'guasa', 'pinza', 'uvasa', 'flora', 'meson', 'celso', 'cacao', 'cabra', 'chino', 'chivo', 'tarta'];


        foreach ($palabras as $palabra) {
            DB::table('palabras')->insert([
                'palabra' => $palabra
            ]);
        }
    }
}
