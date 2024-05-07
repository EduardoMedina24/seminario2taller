<?php

namespace App\Http\Controllers;

use App\Models\Palabras;
use Illuminate\Http\Request;

class PalabrasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return response()->json(Palabras::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $palabra = new Palabras();
        $palabra->palabra = $request->palabra;
        $palabra-> save();
        return response()->json($palabra);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        return response()->json(Palabras::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $palabra = Palabras::find($id);
        $palabra->palabra = $request->palabra;
        $palabra->save();
        return response()->json($palabra);
    }
    
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $palabra =  Palabras::find($id);
        $palabra -> delete();
        return response()->json('eliminado');
    }
}
