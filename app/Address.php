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

    public function htmlAddress() {
        $html = '';

        $html .= "{$this->address}<br />";
        if ($this->address2) {
            $html .= "{$this->address2}<br />";
        }
        $html .= "{$this->city}, {$this->state} {$this->zip}";

        return $html;
    }
}
