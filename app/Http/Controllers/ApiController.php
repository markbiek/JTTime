<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;
use App\Task;
use App\Company;

class ApiController extends Controller {
    public function __construct() {
        $this->middleware('auth');
    }

    public function tasks(Request $request) {
        $user = Auth::user();
        $status = $request->input('status', 'unbilled');

        $tasks = Task::where('user_id', $user->id);

        if ($status == 'unbilled') {
            $tasks = $tasks->where('billed', false);
        } elseif ($status == 'billed') {
            $tasks = $tasks->where('billed', true);
        }

        if ($request->input('invoice')) {
            $tasks = $tasks->where('invoice_id', $request->input('invoice'));
        }

        $tasks = $tasks->with('company')->orderBy('created_at', 'desc')->get();

        $data = $tasks->toArray();

        return response()->json($data);
    }

    public function companies(Request $request) {
        $companies = Company::orderBy('name')->get();

        return response()->json($companies->toArray());
    }
}
