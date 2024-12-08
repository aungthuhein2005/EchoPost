<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
        'full_name',
        'avatar_url',
        'role',
        'bio',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'last_login' => 'datetime',
        'email_verified_at' => 'datetime',
        'role' => 'string',
    ];

    // Relationships
    public function posts()
    {
        return $this->hasMany(Post::class, 'author_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function media()
    {
        return $this->hasMany(Media::class);
    }

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public function reactions()
    {
        return $this->hasMany(PostReaction::class);
    }

    // Helper methods
    public function isAdmin()
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function isAuthor()
    {
        return $this->role === self::ROLE_AUTHOR;
    }

    public function isVerified()
    {
        return $this->email_verified_at !== null;
    }

    // Add password hashing mutator
    // public function setPasswordAttribute($value)
    // {
    //     $this->attributes['password'] = bcrypt($value);
    // }

    // Add role constants for better maintainability
    const ROLE_ADMIN = 'admin';
    const ROLE_AUTHOR = 'author';
    const ROLE_USER = 'user';
}