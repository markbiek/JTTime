<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model {
    protected $appends = [
        'total'
    ];

    public function company() {
        return $this->belongsTo('App\Company');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function tasks() {
        return $this->hasMany('App\Task')->orderBy('created_at');
    }

    public function getTotalAttribute() {
        return ($this->tasks->sum('hours') * $this->rate) + ($this->tasks->sum('raw_amount'));
    }

    public function generateTag() {
        $id = "";
        foreach (range(1, 15) as $num) {
            $id .= chr(rand(48, 57));
        }

        return $id;
    }
}
