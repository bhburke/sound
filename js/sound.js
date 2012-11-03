var MAX_INT = 4294967295;
var _random_seed;
var _sound_index;
var sound_url;

$(document).ready(function(){

	$("#button img").mousedown(function() {
   	 	$(this).attr("src", "/images/speaker_icon_inverted.png");
		}).mouseup(function() {
    	$(this).attr("src", "/images/speaker_icon.png");
	});


	$("#button").click(function(){
		soundManager.unload('sound');
		soundManager.destroySound('sound');
		get_new_sound();
		play_sound();
		_sound_index=_sound_index+1;

	});
	$("#button img").on('touchstart',function() {
   	 	$(this).attr("src", "images/speaker_icon_inverted.png");
                        });
                  
    $("#button img").on('touchend',function() {

    	$(this).attr("src", "images/speaker_icon.png");
           soundManager.unload('sound');
		soundManager.destroySound('sound');
		get_new_sound();
		play_sound();
		_sound_index=_sound_index+1;            
	});
	init_sounds();
});

function init_sounds(){
	_random_seed = Math.floor(Math.random()*MAX_INT);
	_sound_index = 0;

	soundManager.setup({
		url:"swf",
		flashVersion:9,
		useHTML5Audio:true,
		preferFlash:false
	});

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
			
		}
		else{
			console.log(response.success);
			console.log(response.error);
			sound_url= "";
		}
	});
};

function play_sound(){
	soundManager.createSound({
		id: 'sound',
		url: sound_url,
		onfinish:function(){
			soundManager.unload('sound');
			soundManager.destroySound('sound');
		}
	});
	soundManager.play('sound');
}
