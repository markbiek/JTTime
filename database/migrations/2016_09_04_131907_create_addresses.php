<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAddresses extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('addresses', function (Blueprint $table) {
            $table->increments('id');
            $table->text('address');
            $table->text('address2')->nullable();
            $table->mediumtext('city');
            $table->char('state');
            $table->string('zip');
            $table->timestamps();
        });

        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('address');
            $table->dropColumn('address2');
            $table->dropColumn('city');
            $table->dropColumn('state');
            $table->dropColumn('zip');
            $table->integer('address_id')->nullable();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->integer('address_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('addresses');
    }
}
