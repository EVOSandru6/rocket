var _mapBoxAT = 'pk.eyJ1IjoiZXZvc2FuZHJ1NiIsImEiOiJjajRwdGtnMWcyN2dsMnFtcWR2cWpidXU3In0.WCQS1NI-ADVz6qe75GQGfQ',
    _almaty_location = [43.244202, 76.907387],
    _current_location = null,
    _map,
    _tweetsLayer = L.layerGroup()
    ;

$(document).ready(function ()
{
    initMap();
    initLocation();

    $('#js__tweets').click(function(e)
    {
        e.preventDefault();
        getTweetsFromDB();
    });

    $('#btn-tweet').click(function(e)
    {
        e.preventDefault();
        var params = {
            q: $('#query-tweet').val(),
            count: 100,
            geocode: _current_location.latitude + ',' + _current_location.longitude + ',10000km'
        };
        searchTweetsApi(params);
    });
});

function getTweetsFromDB()
{
    $.ajax({
        url: '/tweets',
        type: 'get',
        dataType: 'json',
        success: function(data)
        {
            draw(data, function(param){}, false);
        },
        error: function ()
        {
            console.log('error');
        }
    });
}

function searchTweetsApi(params)
{
    $.ajax({
        url: '/api/tweets',
        type: 'get',
        // data: params,
        success: function(resp)
        {
            draw(resp.statuses, function(arr)
            {
                checkDBdiff(arr);
            }, true);
        },
        error: function ()
        {
            console.log('error');
        }
    });
}

function draw(data, cb, is__to_api_request)
{
    _tweetsLayer.clearLayers();

    var listForSynth = [];

    for(var i = 0; i < data.length; i++) {

        var item = data[i];

        var disp_name, lat, lng;

        if(is__to_api_request) {

            if(item.geo == undefined && item.coordinates == undefined)
                continue;

            disp_name = item.user.screen_name ? item.user.screen_name : item.user.name;
            lat = item.coordinates.coordinates[1];
            lng = item.coordinates.coordinates[0];

            listForSynth.push({
                message_id: item.id,
                message: item.text,
                user_id: item.user.id,
                user_name: disp_name,
                lat: lat,
                lng: lng
            });
        }
        else {
            disp_name = item.user_name,
            lat = item.lat,
            lng = item.lng
        }

        var tweet = L.marker([lat,lng]).addTo(_tweetsLayer).bindPopup('<strong>'+disp_name+'</strong>: '+item.text);
    }
    _tweetsLayer.addTo( _map );

    cb(JSON.stringify(listForSynth));
}

function getCoordinates()
{
    var diff = 0.1;

    var lat = {
        min: _current_location.latitude + diff,
        max: _current_location.latitude - diff
    };

    var lng = {
        min: _current_location.longitude + diff,
        max: _current_location.longitude - diff
    };

    return [
        getRandomArbitary(lat.min, lat.max),
        getRandomArbitary(lng.min, lng.max)
    ];
}

function getRandomArbitary(min, max)
{
    return Math.random() * (max - min) + min;
}

function  initLocation()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
    function showPosition(position) {
        _current_location = position.coords;
    }
}

function initMap()
{
    _map = L.map('mapContainer').setView(_almaty_location, 13);
    var tiles = {
        'ya':'https://vec03.maps.yandex.net/tiles?l=map&v=4.120.1&x={x}&y={y}&z={z}&v=1',
        'osm':'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+_mapBoxAT
    };
    L.tileLayer(tiles.osm, {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: _mapBoxAT
    }).addTo(_map);
    L.marker(_almaty_location).addTo(_map);
}

function checkDBdiff(list)
{
    $.ajax({
        url: '/tweets/check-db-diff',
        type: 'post',
        data: {
            list: list,
            _csrf: '".Yii::$app->request->csrfToken."'
        },
        success: function(resp) {
            console.log(resp);
        },
        error: function() {
            console.log('error');
        }
    });
}