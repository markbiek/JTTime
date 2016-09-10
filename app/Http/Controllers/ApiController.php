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

    public function storeTask(Request $request) {
        $task = new Task;

        $task->user_id = Auth::user()->id;
        $task->billed = false;
        $task->task = $request->input('task');
        $task->hours = $request->input('hours');
        $task->created_at = $request->input('date');
        $task->company_id = $request->input('company');

        $task->save();
        $task = Task::where('id', $task->id)->with('company')->first();

        return response()->json($task->toArray());
    }

    public function deleteTask(Request $request) {
        $task = Task::where('id', $request->input('id'))->first();

        $data = [
            'msg' => '',
            'status' => 'error'
        ];

        if (!empty($task)) {
            if ($task->user_id == Auth::user()->id) {
                $data['msg'] = $task->id;
                $data['status'] = 'ok';

                $task->delete();
            } else {
                $data['msg'] = 'Permission denied.';
            }
        } else {
            $data['msg'] = 'Task not found.';
        }

        return response()->json($data);
    }
}
