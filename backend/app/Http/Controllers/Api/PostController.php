<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->paginate(10);
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'slug' => Str::slug($request->title),
            'user_id' => Auth::id(),
        ]);

        return response()->json($post->load('user'), 201);
    }

    public function show(Post $post)
    {
        return response()->json($post->load('user'));
    }

    public function update(Request $request, Post $post)
    {
        // Проверка, что пользователь является автором поста
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Доступ запрещен'], 403);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        $post->update($request->only(['title', 'content']));

        if ($request->has('title')) {
            $post->slug = Str::slug($request->title);
            $post->save();
        }

        return response()->json($post->load('user'));
    }

    public function destroy(Post $post)
    {
        // Проверка, что пользователь является автором поста
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Доступ запрещен'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Пост удален успешно']);
    }

    // Получение постов текущего пользователя
    public function myPosts()
    {
        $posts = Post::where('user_id', Auth::id())->paginate(10);
        return response()->json($posts);
    }
}