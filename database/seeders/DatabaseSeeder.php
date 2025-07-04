<?php

namespace Database\Seeders;

use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\DataPegawaiTiran;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'User',
                'email' => 'user@admin.com',
                'password' => bcrypt('password'),
            ],
        ];
        foreach ($users as $user) {
            User::create($user);
        }


        $roles =[
            ['nama' => 'Admin'],
            ['nama' => 'Pegawai'],
            ['nama' => 'Manager'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }



        DataPegawaiTiran::factory(50)->create();





    }
}
