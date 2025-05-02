<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    protected $table = 'pet';
    protected $primaryKey = 'pet_id';
    protected $fillable = [
        'pet_name',
        'pet_location',
        'pet_age',
        'pet_description',
        'pet_status',
        'breed_id',
        'type_id',
        'user_id',
        'pet_tag'
    ];
    public function breed(){
        return $this->belongsTo(Breed::class,'breed_id');
    }
    public function type(){
        return $this->belongsTo(Type::class,'type_id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public $timestamps = false;

}
