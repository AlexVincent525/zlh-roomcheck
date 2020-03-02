<?php

namespace App\Http\Controllers;

use App\ScoreCheck\Models\File;
use App\ScoreCheck\Other\ResultImportHandler;
use App\ScoreCheck\Repositories\CheckResultRepository;
use App\ScoreCheck\Repositories\FileRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class AdminController extends Controller
{
    public function index(FileRepository $fileRepository)
    {
        $files = $fileRepository->orderBy('id', 'desc')->all();
        $fileNumber = $files->count();
        $files = $files->take(10);
        $data = [
            'files' => $files,
            'allFileNumber' => $fileNumber,
        ];

        return view('admin', $data);
    }

    public function getFilesJson(FileRepository $fileRepository)
    {
        $files = $fileRepository->orderBy('id', 'desc')->all()->take(10);
        $result = [];

        foreach ($files as $file) {
            $result[] = new class ($file)
            {
                public $id;
                public $file_name;
                public $upload_user;
                public $created_at;

                public function __construct($file)
                {
                    $this->id = $file->id;
                    $this->file_name = $file->file_name;
                    $this->upload_user = $file->uploadUser->name;
                    $this->created_at = $file->created_at->toDateTimeString();
                }
            };
        }

        return response()->json($result);
    }

    public function import(
        Request $request,
        ResultImportHandler $resultImportHandler,
        CheckResultRepository $checkResultRepository,
        File $file
    ) {

        $checkDate = $request->input('check_date');
        $uploadFile = $request->file('file_data');

        $file->file_name = $uploadFile->getClientOriginalName();
        $file->upload_user_id = \Auth::user()->id;
        $file->save();

        $uploadFile->move(storage_path(
            'uploads'),
            '/' . $file->id . '.' . $uploadFile->getClientOriginalExtension()
        );

        $resultImportHandler->setFile(
            storage_path('uploads') . '/' . $file->id . '.' . $uploadFile->getClientOriginalExtension()
        );
        $checkResults = $resultImportHandler->getResult();

        $checkResultRepository->import($checkResults, $checkDate);

        return response()->json();
    }
}
