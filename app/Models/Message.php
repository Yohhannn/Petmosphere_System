<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table = 'message';
    protected $primaryKey = 'msg_id';
    protected $fillable = [
        'msg_time',
        'msg_content',
        'sender_id',
        'receiver_id',
        'post_id'
    ];
    public function sender() {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver() {
        return $this->belongsTo(User::class, 'receiver_id');
    }
    public function post(){
        return $this->belongsTo(Post::class,'post_id');
    }
    public $timestamps = false;

}
