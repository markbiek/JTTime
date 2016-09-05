<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Invoice;

class InvoiceController extends Controller {
    public function viewInvoice($tag) {
        $invoice = Invoice::where('tag', $tag)->first();

        return view('invoice', ['invoice' => $invoice]);
    }
}
