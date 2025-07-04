<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PegawaiResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
   public function toArray(Request $request): array
    {

      return [
        'id' => $this->id,
        'nama' => $this->nama,
        'email' => $this->email,
        'no_telepon' => $this->no_telepon,
        'jabatan' => $this->jabatan,
        'roles' => new RoleResource($this->roles),


      ];
    }
}
