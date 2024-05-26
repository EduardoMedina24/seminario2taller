<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Record;
use Illuminate\Support\Facades\Auth;

class RecordsController extends Controller
{
    //
    public function index()
    {
        return response()->json(Record::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user_id = Auth::id(); // Obtener el ID del usuario autenticado
        
        $record = new Record();
        $record->palabra = $request->palabra;
        $record->dificultad = $request->dificultad;
        $record->tiempo = $request->tiempo;
        $record->user_id = $user_id; // Asignar el ID del usuario al registro
        $record->save();

        return response()->json($record);
    }
    public function show($id)
    {
        return response()->json(Record::find($id));
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $record = Record::find($id);
        $record->dificultad = $request->dificultad;
        $record->tiempo = $request->tiempo;
        // No actualizamos user_id en este caso, ya que estamos actualizando el registro existente
        $record->save();

        return response()->json($record);
    }
    public function destroy($id)
    {
        $record = Record::find($id);
        $record->delete();

        return response()->json('Registro eliminado');
    }

}
