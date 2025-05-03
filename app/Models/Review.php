<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $table = 'review';
    protected $primaryKey = 'rev_id';
    protected $fillable = [
      'rev_rating',
      'rev_description',
        'rev_date',
        'rev_rated_by',
        'user_id'
    ];
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
    public function reviewBy(){
        return $this->belongsTo(User::class, 'rev_rated_by');
    }
    public $timestamps = false;
}
