<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\DataPegawaiTiran;
use App\Http\Resources\RoleResource;
use App\Http\Resources\PegawaiResource;
use App\Http\Requests\StoreDataPegawaiTiranRequest;
use App\Http\Requests\UpdateDataPegawaiTiranRequest;

class DataPegawaiTiranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
      $perPage = $request->get('per_page', 10);

      $search = $request->get('search');

      $query = DataPegawaiTiran::query();

      $dataPegawaiTiran =  $query->latest()->paginate($perPage)->withQueryString();



      return Inertia::render('dashboard', [
        'dataPegawaiTiran' => PegawaiResource::collection($dataPegawaiTiran),
        'search' => $search,
        'title'=> 'Data Pegawai Tiran',
        'roles' => Role::all(),

      ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'no_telepon' => 'required|string|max:15',
            'jabatan' => 'required|string|max:255',
            'role_id' => 'required|exists:roles,id',
        ]);

        DataPegawaiTiran::create($validated);
        return redirect()->back()->with('success', 'Data Pegawai Berhasil Ditambahkan');


    }

    /**
     * Display the specified resource.
     */
    public function show(Request $dataPegawaiTiran)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DataPegawaiTiran $dataPegawaiTiran)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DataPegawaiTiran $dataPegawaiTiran)
    {
        // dd($dataPegawaiTiran);
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'no_telepon' => 'required|string|max:15',
            'jabatan' => 'required|string|max:255',
            'role_id' => 'required|exists:roles,id',
        ]);
        $dataPegawaiTiran->update($validated);

        return redirect()->back()->with('success', 'Data Pegawai Berhasil Diupdate');


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataPegawaiTiran $dataPegawaiTiran)
    {
        // dd($dataPegawaiTiran);
        $dataPegawaiTiran->delete();

        return redirect()->route('dataPegawai.index')->with('success', 'Data Pegawai berhasil dihapus');
    }
}
