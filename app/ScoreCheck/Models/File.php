<?php

namespace App\ScoreCheck\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\ScoreCheck\Models\File
 *
 * @property int $id
 * @property string $file_name
 * @property int $upload_user_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\ScoreCheck\Models\File whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ScoreCheck\Models\File whereFileName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ScoreCheck\Models\File whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ScoreCheck\Models\File whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ScoreCheck\Models\File whereUploadUserId($value)
 * @mixin \Eloquent
 */
class File extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    public function uploadUser()
    {
        return $this->belongsTo(\App\ScoreCheck\Models\User::class);
    }
}
