<?php

namespace App\ScoreCheck\Repositories;

use App\ScoreCheck\Models\CheckResult;
use Prettus\Repository\Eloquent\BaseRepository;

class CheckResultRepository extends BaseRepository
{
    public function model()
    {
        return CheckResult::class;
    }

    public function search($checkDate, $roomNumber)
    {
        if ($roomNumber == null) {
            $where = ['check_date' => $checkDate];
            return $this->findWhere($where);
        } else {
            $roomNumber = '%' . $roomNumber . '%';
            $where = [
                'check_date' => $checkDate,
                ['room_number' , 'like', $roomNumber]
            ];
            return $this->findWhere($where);
        }
    }

    public function import(array $checkResults, $checkDate)
    {
        foreach ($checkResults as $checkResult){
            $where = [
                'check_date' => $checkDate,
                'room_number' => $checkResult['room']
            ];

            $result = $this->findWhere($where);

            $new = [
                'room_number' => $checkResult['room'],
                'first_score' => $checkResult['first_score'],
                'second_score' => $checkResult['second_score'],
                'average' => $checkResult['average'],
                'check_date' => $checkDate
            ];

            if ($new["room_number"] == null) {
                break;
            }

            if ($result->count() == 0) {
                $this->create($new);
            } else {
                $id = $result->first()->id; 
                $this->update($new, $id);
            }
        }
    }
}
