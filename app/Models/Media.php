<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'user_id',
        'file_name',
        'file_type',
        'mime_type',
        'file_size',
        'file_path',
        'alt_text',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Helper method for full URL
    public function getUrlAttribute()
    {
        return asset('storage/' . $this->file_path);
    }
}