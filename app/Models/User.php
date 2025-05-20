<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable,HasApiTokens;

    protected $table = 'user';
    protected $primaryKey = 'user_id';
    protected $fillable = [
        'user_name',
        'user_phone',
        'user_location',
        'user_prof_pic',
        'user_valid_id_pic',
        'user_email',
        'user_pass',
        'user_createdate',
        'user_verified',
        'is_active'
    ];
    public $timestamps = false;
    protected $hidden = [
        'user_pass',
        'remember_token',
    ];
    public function getAuthPassword()
    {
        return $this->user_pass;
    }

    /**
     * Override username field to use `user_email`
     */
    public function username()
    {
        return 'user_email';
    }
}
