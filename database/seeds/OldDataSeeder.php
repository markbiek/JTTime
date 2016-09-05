<?php

use Illuminate\Database\Seeder;

class OldDataSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run() {
        $old = DB::connection('old_jttime');

        $invoices = $old->select('select * from invoices');
        foreach ($invoices as $oldInvoice) {
            $company = App\Company::where('name', $oldInvoice->companyname)->first();
            if (empty($company)) {
                throw new Exception("Could not find current company named {$oldInvoice['companyname']}");
            }

            $newInvoice = new App\Invoice;
            $newInvoice->description = $oldInvoice->desc;
            $newInvoice->company_id = $company->id;
            $newInvoice->rate = $oldInvoice->rate;
            $newInvoice->paid = (bool) $oldInvoice->paid;
            $newInvoice->tag = $oldInvoice->tag;
            $newInvoice->created_at = date('Y-m-d H:i:s', strtotime($oldInvoice->datetim));
            $newInvoice->updated_at = date('Y-m-d H:i:s', strtotime($oldInvoice->datetim));

            $newInvoice->save();

            $tasks = $old->select('select * from invoicetasks it left join tasks t on t.taskid = it.taskid where t.billed = 1 and it.invoiceid = ' . $oldInvoice->invoiceid);

            foreach ($tasks as $oldTask) {
                $newTask = new App\Task;
                $newTask->invoice_id = $newInvoice->id;
                $newTask->company_id = $company->id;
                $newTask->task = $oldTask->task;
                $newTask->hours = $oldTask->timespent;
                $newTask->billed = $oldTask->billed;
                $newTask->raw_amount = $oldTask->rawamount;
                $newTask->created_at = date('Y-m-d H:i:s', strtotime($oldTask->datetim));
                $newTask->updated_at = date('Y-m-d H:i:s', strtotime($oldTask->datetim));

                $newTask->save();
            }
        }

        $tasks = $old->select('select * from tasks where billed = 0');

        foreach ($tasks as $oldTask) {
            $newTask = new App\Task;
            $newTask->invoice_id = $newInvoice->id;
            $newTask->company_id = $company->id;
            $newTask->task = $oldTask->task;
            $newTask->hours = $oldTask->timespent;
            $newTask->billed = $oldTask->billed;
            $newTask->raw_amount = $oldTask->rawamount;
            $newTask->created_at = date('Y-m-d H:i:s', strtotime($oldTask->datetim));
            $newTask->updated_at = date('Y-m-d H:i:s', strtotime($oldTask->datetim));

            $newTask->save();
        }
    }
}
