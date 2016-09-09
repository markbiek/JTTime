<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model {
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
