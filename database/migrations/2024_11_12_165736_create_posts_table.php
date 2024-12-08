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
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('slug')->unique();
        $table->text('content');
        $table->text('excerpt')->nullable();
        $table->string('featured_image')->nullable();
        $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
        $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
        $table->enum('visibility', ['public', 'private', 'password_protected'])->default('public');
        $table->string('password')->nullable();
        $table->integer('view_count')->default(0);
        $table->timestamp('published_at')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
