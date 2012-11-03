var MAX_INT = 4294967295;
var _random_seed;
var _sound_index;
var sound_url;

$(document).ready(function(){

	init_sounds();

	$("#button img").mousedown(function() {
   	 	$(this).attr("src", "/images/speaker_icon_inverted.png");
		}).mouseup(function() {
    	$(this).attr("src", "/images/speaker_icon.png");
	});


	$("#button").click(onButtonPress);
	$("#button img").on('touchstart',function() {
   	 	$(this).attr("src", "images/speaker_icon_inverted.png");
                        });
                  
    $("#button img").on('touchend',function() {

    	$(this).attr("src", "images/speaker_icon.png");
      	 onButtonPress();          
	});
	
});
function onButtonPress(){
	destroy_sounds();
	play_sound();
		_sound_index=_sound_index+1;
		get_new_sound();
}

function init_sounds(){
	_random_seed = Math.floor(Math.random()*MAX_INT);
	_sound_index = 0;

	soundManager.setup({
		url:"swf",
		flashVersion:9,
		useHTML5Audio:true,
		preferFlash:false
	});
	get_new_sound();
}

function get_new_sound(){
	$.ajax({
		url:"/scripts/get_sound",
		dataType:"json",
		data:{
			seed:_random_seed,
			index:_sound_index
		}

	}).success(function(response){
		console.log(response);
		if(response.success){
			sound_url=response.url;
			make_sound_object();
			
		}
		else{
			console.log(response.success);
			console.log(response.error);
			sound_url= "";
		}
	});
};

function make_sound_object(){
	var sound_id = 'sound'+_sound_index;
	soundManager.createSound({
		id: sound_id,
		url: sound_url,
		onfinish:function(){
			soundManager.unload(sound_id);
			soundManager.destroySound(sound_id);
		}
	});
}

function destroy_sounds(){
	var sound_id = 'sound'+(_sound_index-1);
	soundManager.unload(sound_id);
	soundManager.destroySound(sound_id);
}

function play_sound(){
	soundManager.play('sound'+_sound_index);
}
