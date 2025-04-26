<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestHistory extends Model
{
    protected $table = 'request_history';
    protected $primaryKey = 'history_id';
    protected $fillable = [
        'status_old',
        'status_new',
        'change_at',
        'change_by',
        'req_id',
    ];
    public function adoptionRequest(){
        return $this->belongsTo(AdoptionRequest::class, 'req_id');
    }
    public function user(){
        return $this->belongsTo(User::class, 'change_by');
    }
    public $timestamps = false;

}
