<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Breed extends Model
{
    protected $table = 'breed';
    protected $primaryKey = 'breed_id';
    protected $fillable = [
        'breed_name',
        'type_id',
    ];
    public function type(){
        return $this->belongsTo(Type::class, 'type_id');
    }
    public $timestamps = false;

}
