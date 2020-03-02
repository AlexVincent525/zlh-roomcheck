<?php

namespace App\ScoreCheck\Repositories;

use App\ScoreCheck\Models\File;
use Prettus\Repository\Eloquent\BaseRepository;

class FileRepository extends BaseRepository
{
    public function model()
    {
        return File::class;
    }
}