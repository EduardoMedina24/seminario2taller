<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function index()
    {
        return response()->json(Usuario::all());
    }

    public function store(Request $request)
    {
        $usuario = new Usuario();
        $usuario->name = $request->name;
        $usuario->email = $request->email;
        $usuario->password = Hash::make($request->password);
        $usuario->save();

        return response()->json($usuario);
    }

    public function show($id)
    {
        return response()->json(Usuario::find($id));
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::find($id);
        $usuario->name = $request->name;
        $usuario->email = $request->email;
        if ($request->password) {
            $usuario->password = Hash::make($request->password);
        }
        $usuario->save();

        return response()->json($usuario);
    }

    public function destroy($id)
    {
        $usuario = Usuario::find($id);
        $usuario->delete();

        return response()->json('Usuario eliminado');
    }
     // Método de autenticación para login
public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = Usuario::where('email', $request->email)->first();

    if ($user && Hash::check($request->password, $user->password)) {
        // Aquí puedes generar un token de autenticación o manejar la sesión
        return response()->json(['message' => 'Login successful', 'user' => ['name' => $user->name, 'email' => $user->email]], 200);
    } else {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
}
