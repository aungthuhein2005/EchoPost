<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'setting_key',
        'setting_value',
        'setting_type',
    ];

    // Helper methods for type casting
    public function getValueAttribute()
    {
        return match($this->setting_type) {
            'boolean' => (boolean) $this->setting_value,
            'integer' => (int) $this->setting_value,
            'json' => json_decode($this->setting_value, true),
            default => $this->setting_value,
        };
    }
}