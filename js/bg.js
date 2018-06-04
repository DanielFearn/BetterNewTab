// Background control

var bg = {
	// <summary>
	// Prompts user for background location and stores in localstorage
	// </summary>
	set_background: function(){
		var location = prompt('Location of the background image:');
		if(location != null){
			localStorage.setItem('newtabbg', location);
			this.load_background();
		}
	},

	// <summary>
	// Gets background image location from localstorage and sets it
	// </summary
	load_background: function(){
		if(!localStorage.getItem('newtabbg')){
			localStorage.setItem('newtabbg', 'https://stmed.net/sites/default/files/dark-fantasy-wallpapers-28123-2111385.jpg');
		}
		var bg = 'url('+localStorage.getItem('newtabbg')+')';
		console.log(bg);
		$('#outer_container').attr('style', 'background-image: '+bg);
	}
}