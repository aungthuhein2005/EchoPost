<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('comments', function (Blueprint $table) {
        $table->id();
        $table->foreignId('post_id')->constrained()->cascadeOnDelete();
        $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
        $table->foreignId('parent_id')->nullable()->constrained('comments')->cascadeOnDelete();
        $table->text('content');
        $table->string('author_name', 100)->nullable();
        $table->string('author_email', 100)->nullable();
        $table->enum('status', ['pending', 'approved', 'spam'])->default('pending');
        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
