<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model {
    public function users() {
        return $this->hasMany('App\User');
    }

    public function companies() {
        return $this->hasMany('App\Company');
    }
}
