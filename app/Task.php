<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model {
    protected $fillable = [
        'hours',
        'user_id',
        'task',
        'company_id'
    ];

    public function company() {
        return $this->belongsTo('App\Company');
    }

    public function invoice() {
        return $this->belongsTo('App\Invoice');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }
}
