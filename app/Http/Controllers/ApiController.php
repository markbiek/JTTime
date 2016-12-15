<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;
use App\Task;
use App\Invoice;
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
        $companies = Company::where('archived', 0)
            ->orderBy('name')->get();

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

    public function invoices(Request $request) {
        $user = Auth::user();
        $status = $request->input('status', 'unpaid');

        $invoices = Invoice::where('user_id', $user->id);

        if ($status == 'unpaid') {
            $invoices = $invoices->where('paid', false);
        } elseif ($status == 'paid') {
            $invoices = $invoices->where('paid', true);
        }

        $invoices = $invoices->with('company')->orderBy('created_at', 'desc')->get();

        $data = $invoices->toArray();

        return response()->json($data);
    }

    public function storeInvoice(Request $request) {
        $invoice = new Invoice;

        if (empty($request->input('rate'))) {
            $rate = 0;
        } else {
            $rate = $request->input('rate');
        }

        $invoice->rate = $rate;
        $invoice->user_id = Auth::user()->id;
        $invoice->paid = false;
        $invoice->description = $request->input('desc');
        $invoice->created_at = $request->input('date');
        $invoice->company_id = $request->input('company');
        $invoice->tag = $invoice->generateTag();

        $invoice->save();
        $invoice = Invoice::where('id', $invoice->id)->with('company')->first();

        foreach ($request->input('tasks') as $taskId) {
            $task = Task::where('id', $taskId)->first();

            $task->billed = true;
            $task->invoice_id = $invoice->id;

            $task->save();
        }

        //If we don't get a rate passed in,
        //use the company's default rate
        if ($rate == 0) {
            $invoice->rate = $invoice->company->default_rate;
            $invoice->save();
        }

        return response()->json($invoice->toArray());
    }

    public function deleteInvoice(Request $request) {
        $invoice = Invoice::where('id', $request->input('id'))->first();

        $data = [
            'msg' => '',
            'status' => 'error'
        ];

        if (!empty($invoice)) {
            if ($invoice->user_id == Auth::user()->id) {
                $data['msg'] = $invoice->id;
                $data['status'] = 'ok';

                //Mark all invoice tasks as unbilled
                foreach ($invoice->tasks as $task) {
                    $task->invoice_id = null;
                    $task->billed = 0;
                    $task->save();
                }

                $invoice->delete();
            } else {
                $data['msg'] = 'Permission denied.';
            }
        } else {
            $data['msg'] = 'Invoice not found.';
        }

        return response()->json($data);
    }

    public function payInvoice(Request $request) {
        $invoice = Invoice::where('id', $request->input('id'))->first();

        $data = [
            'msg' => '',
            'status' => 'error'
        ];

        if (!empty($invoice)) {
            if ($invoice->user_id == Auth::user()->id) {
                $invoice->paid = true;
                $invoice->save();

                $data['msg'] = $invoice->id;
                $data['status'] = 'ok';
            } else {
                $data['msg'] = 'Permission denied.';
            }
        } else {
            $data['msg'] = 'Invoice not found.';
        }

        return response()->json($data);
    }
}
