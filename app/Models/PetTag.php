<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PetTag extends Model
{
    protected $table = 'pet_tag';
    protected $primaryKey = 'pet_tag_id';

    protected $fillable = [
        'pet_id',
        'req_id',
    ];
    public function pet(){
        return $this->belongsTo(Pet::class, 'pet_id');
    }
    public function adoption_request(){
        return $this->belongsTo(AdoptionRequest::class, 'req_id');
    }
    public $timestamps = false;

}
