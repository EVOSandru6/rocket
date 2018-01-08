{!! Form::model($article=new \App\Tweet(), ['action'=>'TweetsController@store', 'class'=>'navbar-form navbar-righ']) !!}

<div class="form-group">
    {!! Form::text('search', null, [
        'id'=>'query-tweet',
        'class'=>'form-control',
        'placeholder'=>'title',
        'value'=>'сегодня',
        'required'=>true,
    ]) !!}
</div>

<button type="submit" id="btn-tweet" class="btn btn-success">Find</button>

{!! Form::close() !!}