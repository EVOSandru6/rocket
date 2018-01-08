<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tweet extends Model
{

    protected $fillable = [
        'user_id',
        'name',
        'message_id',
        'message',
        'lat',
        'lng',
    ];

    public static function add($fields)
    {
        $post = new static;
        $post->fill($fields);
        $post->save();

        return $post;
    }
}
