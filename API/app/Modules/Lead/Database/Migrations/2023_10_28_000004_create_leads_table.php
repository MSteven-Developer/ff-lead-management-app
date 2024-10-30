<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLeadsTable extends Migration
{
    public function up()
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->foreignId('lead_status_id')->constrained('lead_statuses')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('leads');
    }
}
