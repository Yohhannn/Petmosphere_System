<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $table = 'user';
    protected $primaryKey = 'user_id';
    protected $fillable = [
        'user_name',
        'user_phone',
        'user_location',
        'user_prof_pic',
        'user_valid_id',
        'user_email',
        'user_pass',
        'user_createdate',
        'user_type',
    ];
    public $timestamps = false;
    protected $hidden = [
        'user_pass',
        'remember_token',
    ];
}
