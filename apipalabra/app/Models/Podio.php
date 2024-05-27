<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Model;


class Podio extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'tiempo',
        'palabra',
        'dificultad',
    ];
    public $timestamps = false;
}
