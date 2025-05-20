<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    protected $table = 'admin';

    protected $primaryKey = 'admin_id';

    public $timestamps = false;

    protected $fillable = [
        'admin_username',
        'admin_pass',
    ];

    protected $hidden = [
        'admin_pass',
    ];

    public function getAuthPassword()
    {
        return $this->admin_pass;
    }

    public function getAuthIdentifierName()
    {
        return 'admin_username';
    }
}
