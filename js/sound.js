var MAX_INT = 4294967295;
var _random_seed;
var _sound_index;

$(document).ready(function(){

	$("#button img").mousedown(function() {
   	 	$(this).attr("src", "/images/speaker_icon_inverted.png");
		}).mouseup(function() {
    	$(this).attr("src", "/images/speaker_icon.png");
	});


	$("#button").click(function(){
		var new_url=get_new_sound();
		play_sound(new_url);
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
		data:{
			seed:_random_seed,
			index:_sound_index
		}

	}).success(function(url){
		return url;
	}).fail(function(r){
		console.log(r);
		return "";
	});
};

function play_sound(sound_url){
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
