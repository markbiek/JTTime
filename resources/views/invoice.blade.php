<?php
    $user = $invoice->user;
    $company = $invoice->company;
    $address = $company->address;
?>
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="columns is-centered">
        <div class="column">
            <div class="return-address">
                <h1 class="is-size-2 has-text-info">Invoice &mdash; {{ $invoice->company->name }}</h1>
                <p>
                @if (!empty($address))
                    {!! $address->htmlAddress() !!}
                @endif
            </div> <!-- /return-address -->

            <table class="table is-fullwidth is-hoverable">
                <thead>
                    <th>Date</th>
                    <th>Task</th>
                    <th>Amount</th>
                </thead>
                <tbody>
<?php
$total = 0;
?>
        @foreach ($invoice->tasks as $task)
<?php
$amount = $task->raw_amount ? $task->raw_amount : ($task->hours * $invoice->rate);
$total += $amount;
?>
                <tr>
                    <td>{{ date('Y-m-d', strtotime($task->created_at)) }}</td>
                    <td>{{ $task->task }}</td>
                    <td>{{ "$" . $amount }}</td>
                </tr>
        @endforeach
            <tr>
                        <td colspan="2">&nbsp;</td>
                        <td>
                            <p class="is-size-4"><strong>Total: {{ "$" . $total }}</strong></p>
                            @if (!$invoice->paid)
                                <p class="footnote">
                                    <strong>Pay To:</strong><br />
                                    {{ $user->name }}<br />
                                    {!! $user->address->htmlAddress() !!}<br />
                                </p>
                            @else
                                <span class="footnote"><br />This invoice has been paid</span>
                            @endif
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> <!-- /column -->
    </div> <!-- /columns -->
</div> <!-- /container -->
@endsection
