<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Record;

class RecordsController extends Controller
{
    public function index()
    {
        return response()->json(Record::all());
    }

    public function store(Request $request)
    {
        $record = Record::create($request->all());
        return response()->json($record, 201);
    }

    public function show($id)
    {
        $record = Record::find($id);
        if ($record) {
            return response()->json($record);
        } else {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $record = Record::find($id);
        if ($record) {
            $record->update($request->all());
            return response()->json($record);
        } else {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }
    }

    public function destroy($id)
    {
        $record = Record::find($id);
        if ($record) {
            $record->delete();
            return response()->json(['message' => 'Registro eliminado']);
        } else {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }
    }

}
