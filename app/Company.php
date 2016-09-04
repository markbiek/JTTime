<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model {
    public function invoices() {
        return $this->hasMany('App\Invoice');
    }

    public function address() {
        return $this->belongsTo('App\Address');
    }
}
