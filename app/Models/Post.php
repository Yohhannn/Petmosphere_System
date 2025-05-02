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
        'tag_id',
        'type_id',
        'user_id',
        'breed_id',
        'post_status',
        'post_tag'
    ];
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function tag(){
        return $this->belongsTo(Tag::class,'tag_id');
    }
    public function type(){
        return $this->belongsTo(Type::class,'type_id');
    }
    public function breed(){
        return $this->belongsTo(Breed::class,'breed_id');
    }
    public function pet(){
        return $this->belongsTo(Pet::class,'pet_id');
    }
    public $timestamps = false;

}
