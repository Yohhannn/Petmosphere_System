<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $table = 'type';
    protected $primaryKey = 'type_id';
    protected $fillable = ['type_name'];
    public $timestamps = false;

}
