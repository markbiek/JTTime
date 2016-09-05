<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model {
    public function company() {
        return $this->belongsTo('App\Company');
    }

    public function tasks() {
        return $this->hasMany('App\Task');
    }
}
