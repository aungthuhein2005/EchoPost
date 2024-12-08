<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'featured_image',
        'author_id',
        'status',
        'visibility',
        'password',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'view_count' => 'integer',
    ];

    // Relationships
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }


    public static function latestPosts()
    {
        return static::latest()->where('status', 'published')->take(6)->get();
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'post_categories');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'post_tags');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->with('user');
    }

    public function reactions()
    {
        return $this->hasMany(PostReaction::class);
    }

    // Scopes
    public function scopePublished(Builder $query)
    {
        return $query->where('status', 'published');
                    // ->where('published_at', '<=', now());
    }

    public function scopePublic(Builder $query)
    {
        return $query->where('visibility', 'public');
    }


    // Helper methods
    public function isPublished()
    {
        return $this->status === 'published' && $this->published_at <= now();
    }

    public function incrementViewCount()
    {
        $this->increment('view_count');
    }

   public function postByAuthor($authorId)
{
    return static::where('author_id', $authorId); // Return the query builder
}

}