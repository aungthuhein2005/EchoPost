<?php

use App\Helpers\DummyData;
use App\Http\Controllers\Auth\AuthController;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\PostReaction;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request;
use Illuminate\Types\Model\Article;

Route::get('/', function () {
    $posts = (new Post)->latestPosts();
    return Inertia::render('Home',['posts'=>$posts]);
});

Route::get('/articles', function () {
    $posts = Post::published()->with('categories')->get();
    $categories = Category::get();
    return Inertia::render('Articles',['posts'=>$posts,'categories'=>$categories]);
});

Route::get('/articles/create', function () {
    $categories = Category::all();
    $tags = Tag::all();
    return Inertia::render('CreateArticle',['categories'=>$categories,'tags'=>$tags]);
})->middleware('auth');

Route::post('/articles/{post:slug}/comments', function(Request $request, Post $post) {
    Log::info('Incoming comment request data:', Request::all());
    $validated = Request::validate([
        'content' => 'required|string|max:1000',
    ]);
    $comment = $post->comments()->create([
        'user_id' => Request::user()->id,
        'author_name' => Request::user()->full_name,
        'content' => $validated['content'],
    ]);
    return redirect()->route('articles.show', $post->slug);
});

Route::get('/articles/{post:slug}', function (Post $post) {
    return Inertia::render('ArticleDetail', [
        'article' => $post->load(['categories:id,name', 'comments', 'author:id,full_name,avatar_url,username','reactions']),
    ]);
})->name('articles.show');

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/profile/{userId}', function ($userId) {
    $post = new Post();
    $articles = $post->postByAuthor($userId)->with('categories')->get();
    $saved = (new PostReaction())->findSavedPostsByUserId($userId);
    $commentCount = (new Comment())->getCommentCount($userId);
    return Inertia::render('UserProfile',[
        "posts" => $articles,
        "saved" => $saved,
        'commentCount' => $commentCount,
    ]);
})->middleware('auth')->name('profile');

Route::get('/profile/{userId}/edit', function ($userId) {
    $user = User::findOrFail($userId); // Assuming you have a User model
    return Inertia::render('EditProfile', ['user' => $user]);
})->middleware('auth')->name('profile.edit');

// Route::get('/articles/{userId}', function ($userId) {
//     $post = new Post();
//     $articles = $post->postByAuthor($userId)->with('categories')->get();
//    return response()->json($articles);
// });

Route::post('/articles', function () {
    $validated = Request::validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'status' => 'required|in:draft,published',
        'categories' => 'required|exists:categories,id',
        'tags' => 'nullable|array',
        'tags.*' => 'exists:tags,id',
        'slug' => 'required|string|unique:posts,slug',
        'featured_image' => 'nullable|url',
        'author_id' => 'required'
    ]);

    $post = Post::create([
        'title' => $validated['title'],
        'content' => $validated['content'],
        'status' => $validated['status'],
        'slug' => $validated['slug'],
        'featured_image' => $validated['featured_image'] ?? null,
        'author_id' => $validated['author_id'],
    ]);

    $post->categories()->attach($validated['categories']);

    if (isset($validated['tags'])) {
        $post->tags()->attach($validated['tags']);
    }

    return redirect()->route('articles.show', $post->slug);
})->middleware('auth');

//authr routes
Route::get('/login', [AuthController::class, 'showLoginForm'])
    ->name('login');

Route::post('/login', [AuthController::class, 'login']);

Route::get('/register', [AuthController::class, 'create'])
    ->name('register');

Route::post('/register', [AuthController::class, 'store']);

Route::post('/logout', function () {
    Auth::logout();
    return redirect('/')->with('success', 'Logged out successfully!');
})->name('logout');

//post react
Route::post('/articles/{post:slug}/react', function (Request $request, Post $post) {
    $validated = Request::validate([
        'reaction_type' => 'required|string|in:like,save',
    ]);

    $reaction = PostReaction::updateOrCreate(
        [
            'post_id' => $post->id,
            'user_id' => Request::user()->id,
        ],
        [
            'reaction_type' => $validated['reaction_type'],
        ]   
    );

    return response()->json(['message'=>"success"]);
})->middleware('auth'); // Ensure the user is authenticated

Route::post('/articles/{post:slug}/toggleLike', function (Request $request, Post $post) {
    $userId = Request::user()->id;
    $reaction = (new PostReaction())->toggleReaction($userId, $post->id, "like");

    if ($reaction) {
        return response()->json(['message' => "Liked"]);
    } else {
        return response()->json(['message' => "Reaction removed"]);
    }
})->middleware('auth'); 

Route::post('/articles/{post:slug}/toggleSave', function (Request $request, Post $post) {
    $userId = Request::user()->id;
    $reaction = (new PostReaction())->toggleReaction($userId, $post->id, "save");

    if ($reaction) {
        return response()->json(['message' => "Saved"]);
    } else {
        return response()->json(['message' => "Reaction removed"]);
    }
})->middleware('auth'); 

Route::post('/profile/{userId}', function (Request $request, $userId) {
    $validated = Request::validate([
        'full_name' => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:users,email,' . $userId,
        'avatar_url' => 'nullable|url',
        'bio' => 'nullable|string|max:500'
    ]);

    $user = User::findOrFail($userId);
    $user->update($validated);

    return redirect()->route('profile', ['userId' => $userId])->with('success', 'Profile updated successfully!');
})->middleware('auth')->name('profile.update');