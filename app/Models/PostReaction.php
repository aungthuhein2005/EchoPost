<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostReaction extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'post_id',
        'user_id',
        'reaction_type',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class)->with('categories');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function toggleReaction($userId, $postId, $reaction)
    {
        $existingReaction = $this->where('user_id', $userId)
                                 ->where('post_id', $postId)
                                 ->where('reaction_type', $reaction)
                                 ->first();

        if ($existingReaction) {
            // If the reaction exists, delete it
            $existingReaction->delete();
            return null; // Indicate that the reaction was removed
        } else {
            // If the reaction does not exist, create a new one
            return $this->create([
                'user_id' => $userId,
                'post_id' => $postId,
                'reaction_type' => $reaction,
            ]);
        }
    }

    public function findSavedPostsByUserId($userId)
    {
        return $this->with('post')->where('user_id', $userId)->where('reaction_type', 'save')->get()->pluck('post');
    }
}