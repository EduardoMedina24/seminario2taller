<?php

namespace App\Http\Controllers;
use App\Models\records;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class recodsController extends Controller{
    public function index()
    {
        $records = records::all();
        return response()->json(["resul" => $records], Response::HTTP_OK);
    }
    
    public function show($id)
    {
        $record = records::find($id);
        return response()->json($record);
    }
    
    public function indexId() {
        $records = Records::orderBy('duracion', 'asc')->limit(5)->get(); // Obtener los 5 registros con menor duración
        return response()->json($records, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $record = new records();

        $record->nombre_jug = $request->nombre_jug;
        $record->nivel_juego = $request->nivel_juego;
        $record->duracion = $request->duracion;
        $record-> save();

        return response()->json(['result' =>$record], Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        $record = records::find($id);

        $record->nombre_jug = $request->nombre_jug;
        $record->nivel_juego = $request->nivel_juego;
        $record->duracion = $request->duracion;
        
        $record-> save();

        return response()->json(['result'=>$record], Response::HTTP_OK);
        
    }

    public function destroy($id)
    {
        $record = records::find($id);
        $record->delete();
        //return response()->json('Record deleted successfully');
        return response()->json(['messege'=>"Eliminado"], Response::HTTP_OK);
    }

}
