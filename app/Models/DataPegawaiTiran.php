<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataPegawaiTiran extends Model
{
    /** @use HasFactory<\Database\Factories\DataPegawaiTiranFactory> */
    use HasFactory;

    protected $guarded = [''];




    public function roles() {
        return $this->belongsTo(Role::class, 'role_id');
    }
}
