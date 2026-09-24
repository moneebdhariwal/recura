<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VideoAsset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function index()
    {
        $videos = VideoAsset::orderByDesc('created_at')->paginate(20)->items();

        return Inertia::render('Admin/Videos/Index', [
            'videos' => $videos,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Videos/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'phobia_type' => 'required|in:spider,height',
            'severity_band' => 'required|in:low,medium,high',
            'counterbalance_group' => 'required|in:A,B',
            'supports_overlay' => 'required|boolean',
            'overlay_start_time' => 'nullable|required_if:supports_overlay,true|integer|min:0',
            'overlay_end_time' => 'nullable|required_if:supports_overlay,true|integer|min:0',
            'description' => 'nullable|string',
            'video_file' => 'required|file|mimes:mp4|max:102400',
        ]);

        if ($request->hasFile('video_file')) {
            $path = $request->file('video_file')->store('videos', 'public');
            $validated['file_path'] = $path;
        }

        $validated['status'] = 'active';
        $validated['uploaded_by'] = $request->user()->id;

        $video = VideoAsset::create($validated);

        return redirect()->route('admin.videos.index')->with('success', 'Video uploaded successfully.');
    }
}

