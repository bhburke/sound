$(document).ready(function(){

	$("#button img").mousedown(function() {
   	 	$(this).attr("src", "speaker_icon_inverted.png");
		}).mouseup(function() {
    	$(this).attr("src", "speaker_icon.png");
});


});

function getNewSound(){

};
