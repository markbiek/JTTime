<?php
    $company = $invoice->company;
    $address = $company->address;
?>
<!doctype html>

<!--[if lt IE 7 ]> <html class="ie ie6 no-js" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie ie7 no-js" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie ie8 no-js" lang="en"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie ie9 no-js" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--><html class="no-js" lang="en"><!--<![endif]-->
<!-- the "no-js" class is for Modernizr. -->

<head id="www-sitename-com" data-template-set="html5-reset">
    <meta charset="utf-8">

    <!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Time | Janus Technical Services</title>

    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap-theme.min.css">

    <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/ui-lightness/jquery-ui.css">
    <link href="//fonts.googleapis.com/css?family=Alegreya+Sans:400,700" rel="stylesheet" type="text/css">
    <link href='//fonts.googleapis.com/css?family=Duru+Sans' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="/css/global.css">
    <link rel="stylesheet" href="/css/print.css" media="print">
</head>
<body class="invoice">

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
</div> <!-- /main -->

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
</body>
</html>

