var buttons = {
	'Demo': {
		desc: 'Gmail and GitHub',
		URLs: 'http://www.gmail.com,http://github.com'
	}
}

var new_btn_button = '<a href="#" class="large_btn" id="create_btn">+</a>';

// <summary>
// Saves button dictionary to localstorage
// </summary>
function save_buttons(){
	var button_string = JSON.stringify(buttons);
	localStorage.setItem('newtabbuttons', button_string);
}

// <summary>
// Loads and parses button dictionary from localstorage
// </summary>
function load_buttons(){
	if(localStorage.getItem('newtabbuttons')){
		buttons = JSON.parse(localStorage.getItem('newtabbuttons'));
	}
}

// <summary>
// Prompts user to get inputs, validates that title isn't empty and that none are null and adds to dictionary
// </summary>
function create_large_button(){
	var title = "";
	while(title == ""){title = prompt('Text to be displayed on the button:');}
	var desc = prompt('Description of the tab(s) the button will open:');
	var tabs = prompt('Comma seperated list of URLs it will open (include "http://"):');

	if(title == null || desc == null || tabs == null){
		alert("Creation aborted.");
	}else{
		buttons[title] = {desc: desc, URLs: tabs};
		generate_buttons(buttons);
		save_buttons();
	}
}


// <summary>
// Uses a dictionary of buttons to append <a> elements to container
// </summary>
// <param name="buttons" type="dictionary"> The dictionary containing buttons info </param>
function generate_buttons(buttons){
	$('#main_container').empty();
	for(var title in buttons){
		var desc = buttons[title].desc;
		$('#main_container').append('<a href="#" class="large_btn link_btn" title="'+desc+'">'+title+'</a>');
	}
	$('#main_container').append(new_btn_button);
	
	set_click_events();
}

// <summary>
// Fetches info about button from dict, opens tabs
// </summary>
// <param name="button" type="DOM element"> The button that was clicked </param>
function btn_click(button){
	var title = button.innerHTML;
	var tabs = buttons[title].URLs.split(",");
	for(var i = 0; i < tabs.length; i++){
		window.open(tabs[i]);
	}
}


// <summary>
// Set onclick events for all elements
// </summary>
function set_click_events(){
	$('.link_btn').click(function(){
		btn_click(this);
	});

	$('#create_btn').click(function(){
		create_large_button();
	});
}

// <summary>
// Prompts user for background location and stores in localstorage
// </summary>
function set_background(){
	var location = prompt("Location of the background image:");
	if(location != null){
		localStorage.setItem('newtabbg', location);
		load_background();
	}
}

// <summary>
// Gets background image location from localstorage and sets it
// </summary
function load_background(){
	if(!localStorage.getItem('newtabbg')){
		localStorage.setItem('newtabbg', 'https://wallpaperbrowse.com/media/images/High-Definition-Ultra-HD-Wallpaper.jpg');
	}
	var bg = 'url('+localStorage.getItem('newtabbg')+')';
	console.log(bg);
	$("#outer_container").attr('style', 'background-image: '+bg);
}


$(document).ready(function(){

	load_buttons();
	generate_buttons(buttons);

	load_background();

});