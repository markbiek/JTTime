<?php
    $user = $invoice->user;
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
    if (!empty($address)) {
        echo $address->htmlAddress();
    }
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
                        <strong>Total: <?php echo "$" . $total; ?></strong>
<?php
if (!$invoice->paid) :
?>
                        <p class="footnote">Pay To:<br /><br />
<?php
    echo $user->name;
?><br />
<?php
    echo $user->address->htmlAddress();
?><br />
                        </p>
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
