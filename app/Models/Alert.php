<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Alert extends Model
{
    use HasFactory;
    protected $table = 'alert';
    protected $primaryKey = 'alert_id';
    protected $fillable = [
        'user_id',
        'admin_id',
        'alert_type',
        'alert_title',
        'alert_message',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function admin() {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

}
