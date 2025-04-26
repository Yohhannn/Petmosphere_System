<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdoptionRequest extends Model
{
    protected $table = 'adoption_request';
    protected $primaryKey = 'req_id';
    protected $fillable = [
        'req_status',
        'req_date',
        'pet_id',
        'user_id',
    ];
    public function pet(){
        return $this->belongsTo(Pet::class, 'pet_id');
    }
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
    public $timestamps = false;

}
