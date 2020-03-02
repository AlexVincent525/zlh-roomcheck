<?php

namespace App\Http\Controllers;

use App\ScoreCheck\Repositories\CheckResultRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class ResultController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function getResult(
        Request $request,
        CheckResultRepository $checkResultRepository
    ) {
        $checkDate = $request->input('date');
        $roomNumber = $request->input('room');

        $results = $checkResultRepository->search($checkDate, $roomNumber)->all();

        return response()->json($results);
    }
}
