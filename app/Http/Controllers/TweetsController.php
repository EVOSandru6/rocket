<?php

namespace app\controllers;

use app\components\TwitterProxy;
use App\Http\Requests\AddTweetRequest;
use app\models\Tweets;
use App\Tweet;
use Illuminate\Http\Request;
use PHPUnit\Framework\Exception;
use Yii;
use yii\helpers\Url;
use yii\web\Controller;
use yii\web\HttpException;

class TweetsController extends Controller
{
    public function store(AddTweetRequest $request)
    {
        Tweet::add($request->all());

        return redirect()->route('map');
    }

    public function list()
    {
        return Tweet::all();
    }

    public function rest($q, $count=false, $geocode=false)
    {
        $oauth_access_token = '770219279300059136-QX7TUszSZrWDFtZLVTuE71cOdK7HLN8';
        $oauth_access_token_secret = 'PA4oIZgXsB5XKcNpl5JxC0S4hqILvh569K3ziN9YIJGwk';
        $consumer_key = 'L41NkJ2eFgfOQXJk5YYoC3UZR';
        $consumer_secret = 'WDHTXKKfbjjRUuz2u345vLbIlUWbBqQo8YsC5EBJCRIKQw06iA';
        $user_id = 770219279300059136;
        $screen_name = 'parallax';

        $params['q'] = $q;
        if(!empty($count))
            $params['count'] = $count;
        if(!empty($geocode))
            $params['geocode'] = $geocode;

        $twitter_url = 'search/tweets.json?'  . http_build_query($params);

        // Create a Twitter Proxy object from our twitter_proxy.php class
        $twitter_proxy = new TwitterProxy(
            $oauth_access_token,			// 'Access token' on https://apps.twitter.com
            $oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
            $consumer_key,					// 'API key' on https://apps.twitter.com
            $consumer_secret,				// 'API secret' on https://apps.twitter.com
            $user_id,						// User id (http://gettwitterid.com/)
            $screen_name,					// Twitter handle
            $count							// The number of tweets to pull out
        );

        $tweets = $twitter_proxy->get($twitter_url);

        echo $tweets;
    }

    public function actionCheckDbDiff(Request $request)
    {
        foreach($request->get('list') as $item) {

            Tweet::firstOrNew([
                'user_id'=>$item['user_id'],
                'user_name'=>$item['user_name'],
                'message_id'=>$item['message_id'],
                'message'=>$item['message'],
                'lat'=>$item['lat'],
                'lng'=>$item['lng']
            ]);
        }
    }
}
