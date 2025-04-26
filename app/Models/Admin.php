<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admin';
    protected $fillable = [
        'admin_username',
        'admin_pass'
    ];
    public $timestamps = false;

    protected $primaryKey = 'admin_id';
    protected $hidden = ['admin_pass'];
}
