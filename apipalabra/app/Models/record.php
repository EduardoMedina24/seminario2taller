<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Model;

class Record extends Model
{
    use HasFactory;
    protected $fillable = ['palabra', 'dificultad', 'tiempo', 'user_id'];
    public $timestamps = false;
}
