<?php
    $company = $invoice->company;
    $address = $company->address;
?>
@extends('layouts.app')

@section('content')
<div class="return-address row">
    <div class="col-md-1"></div>
    <div class="col-md-3">
        <p>
<?php
echo $address->address . '<br />' .
    $address->city . ', ' . $address->state . ' ' . $address->zip;
?>
        </p>
    </div>
    <div class="col-md-6"></div>
</div>

<div class="jumbotron">
    <div class="invoice-name container">
        <h1>Invoice &mdash;
<?=
    $invoice->company->name;
?>
        </h1>
        <h2>
<?=
$invoice->description;
?>
        </h2>
    </div>
</div>

<div id="main" class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8">
        <table class="table table-striped">
            <thead>
                <th>Date</th>
                <th>Task</th>
                <th>Amount</th>
            </thead>
            <tbody>
<?php
$total = 0;

foreach ($invoice->tasks as $task) :
    $amount = $task->raw_amount ? $task->raw_amount : ($task->hours * $invoice->rate);
    $total += $amount;
?>
            <tr>
                <td><?php echo date('Y-m-d', strtotime($task->created_at)); ?>
                <td><?php echo $task->task; ?>
                <td><?php echo "$" . $amount; ?>
            </tr>
<?php
endforeach;
?>
<tr>
                    <td colspan="2">&nbsp;</td>
                    <td>
                        Total: <?php echo "$" . $total; ?>
<?php
if (!$invoice->paid) :
?>
                            <span class="footnote">
                                Pay To: <em>Mark Biek</em>. 
                            </span>
<?php
else :
?>
                            <span class="footnote"><br />This invoice has been paid</span>
<?php
endif;
?>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="col-md-2"></div>
@endsection
