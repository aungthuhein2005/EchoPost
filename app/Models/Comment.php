<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'post_id',
        'user_id',
        'parent_id',
        'content',
        'author_name',
        'author_email',
        'status',
    ];

    // Relationships
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class)->select(['id', 'username', 'full_name','avatar_url','email']);
    }

    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    // Scopes
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    // New method to get comment count by user ID
    public function getCommentCount($userId)
    {
        $userPosts = Post::where('author_id', $userId)->pluck('id');
    
        $commentCount = Comment::whereIn('post_id', $userPosts)  
                               ->where('user_id', '!=', $userId)  
                               ->count();
        
        return $commentCount;
    }
}