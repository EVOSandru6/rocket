<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>

    <meta charset="{{ config('app.charset') }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.charset') }}</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
          integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ=="
          crossorigin=""/>

    <link rel="stylesheet" href="/css/front.css">

</head>

<body>

<div class="wrap">

    @include('outer')

    <div class="map">
        <div id="mapContainer" class="mapContainer"></div>
    </div>
</div>

<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"
        integrity="sha512-lInM/apFSqyy1o6s89K4iQUKg6ppXEgsVxT35HbzUupEVRh2Eu9Wdl4tHj7dZO0s1uvplcYGmt3498TtHq+log=="
        crossorigin=""></script>

<script src="/js/front.js"></script>

</body>
</html>
