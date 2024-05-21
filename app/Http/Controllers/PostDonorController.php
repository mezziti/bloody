<?php

namespace App\Http\Controllers;

use App\Models\DonationPost;
use App\Models\PostDonor;
use Illuminate\Http\Request;

class PostDonorController extends Controller
{
  public function index()
  {
  }

  public function create()
  {
  }

  public function store(Request $request)
  {
    $postId = $request->input('post_id');
    $post = DonationPost::find($postId);
    if (auth()->user()->role != 'donor') {
      return redirect()->route('requests')->with('session', ['id' => $postId, 'message' => "You can't donate", 'type' => 'text-primary']);
    }
    if (auth()->user()->blood_type != $post->blood_type) {
      return redirect()->route('requests')->with('session', ['id' => $postId, 'message' => "You can't donate, because your blood type is not match", 'type' => 'text-primary']);
    }
    if (PostDonor::where('donor_id', auth()->id())->where('post_id', $postId)->exists()) {
      return redirect()->route('requests')->with('session', ['id' => $postId, 'message' => 'You are already donated', 'type' => 'text-primary']);
    }
    $validatedData = $request->validate(['post_id' => 'required|integer']);
    $validatedData['donor_id'] = auth()->id();
    PostDonor::create($validatedData);
    return redirect()->back()->with('session', ['id' => $postId, 'message' => 'You donated successfully', 'type' => 'text-green-500']);
  }

  public function show(PostDonor $postDonor)
  {
  }

  public function edit(PostDonor $postDonor)
  {
  }

  public function update(Request $request, $id)
  {
    PostDonor::find($id)->update(['status' => $request->status, 'message' => $request->message,]);
    return redirect()->back();
  }

  public function destroy(PostDonor $postDonor)
  {
  }
}
