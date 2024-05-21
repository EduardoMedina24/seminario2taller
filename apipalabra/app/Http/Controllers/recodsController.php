<?php

namespace App\Http\Controllers;
use App\Models\records;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class recodsController extends Controller
{
     // Obtener todos los registros
    public function index()
    {
        $records = records::all();
        return response()->json([($records), "message"=> "show records"]);
    }

    // Obtener un registro específico
    public function show($id)
    {
        $record = records::find($id);
        return response()->json($record);
    }

    /* Crear un nuevo registro
    public function store(Request $request)
    {
        $record = records::create($request->all());
        return response()->json($record);
    }*/
    public function store(Request $request)
    {
        $record = new records();

        $record->nombre_jug_1 = $request->nombre_jug_1;
        $record->nivel_juego_1 = $request->nivel_juego_1;

        $record->save(); 
        return response()->json(['result'=>($record)], Response::HTTP_CREATED);
    }

    // Actualizar un registro existente
    public function update(Request $request, $id)
    {
        $record = records::find($id);
        $record->update($request->all());
        return response()->json($record);
    }

    // Eliminar un registro
    public function destroy($id)
    {
        $record = records::find($id);
        $record->delete();
        return response()->json('Record deleted successfully');
    }
}
