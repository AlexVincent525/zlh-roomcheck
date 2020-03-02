<?php

namespace App\ScoreCheck\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\ScoreCheck\Models\CheckResult
 *
 * @property int $id
 * @property string $room_number
 * @property int $first_score
 * @property int $second_score
 * @property \Carbon\Carbon $check_date
 * @property int $upload_user_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\ScoreCheck\Models\CheckResult whereCheckDate($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ScoreCheck\Models\CheckResult whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ScoreCheck\Models\CheckResult whereFirstScore($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ScoreCheck\Models\CheckResult whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ScoreCheck\Models\CheckResult whereRoomNumber($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ScoreCheck\Models\CheckResult whereSecondScore($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ScoreCheck\Models\CheckResult whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ScoreCheck\Models\CheckResult whereUploadUserId($value)
 * @mixin \Eloquent
 */
class CheckResult extends Model
{
    protected $guarded = [];

    protected $dates = ['check_date'];
}
