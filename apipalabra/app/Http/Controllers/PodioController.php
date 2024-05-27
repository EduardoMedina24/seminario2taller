<?php

namespace App\Http\Controllers;

use App\Models\Podio;
use Illuminate\Http\Request;

class PodioController extends Controller
{
    public function index()
    {
        return response()->json(Podio::all());
    }

    public function store(Request $request)
    {
        $podio = Podio::create($request->all());
        return response()->json($podio, 201);
    }

    public function show($id)
    {
        $podio = Podio::find($id);
        if ($podio) {
            return response()->json($podio);
        } else {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $podio = Podio::find($id);
        if ($podio) {
            $podio->update($request->all());
            return response()->json($podio);
        } else {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }
    }

    public function destroy($id)
    {
        $podio = Podio::find($id);
        if ($podio) {
            $podio->delete();
            return response()->json(['message' => 'Registro eliminado']);
        } else {
            return response()->json(['error' => 'Registro no encontrado'], 404);
        }
    }
}
