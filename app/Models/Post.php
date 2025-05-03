<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'post';
    protected $primaryKey = 'post_id';
    protected $fillable = [
        'post_date',
        'post_img',
        'post_descrip',
        'pet_id',
        'user_id',
        'post_status',
        'post_reason'
    ];
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function pet(){
        return $this->belongsTo(Pet::class,'pet_id');
    }
    public $timestamps = false;

}
