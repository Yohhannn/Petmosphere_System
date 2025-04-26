<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table = 'message';
    protected $primaryKey = 'msg_id';
    protected $fillable = [
        'msg_content',
        'sender_id',
        'receiver_id',
        'post_id'
    ];
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function post(){
        return $this->belongsTo(Post::class,'post_id');
    }
    public $timestamps = false;

}
