// TODO rewrite in OOP

// ### Buttons stuff ###

var buttons = {
	'Demo': {
		desc: 'Gmail and GitHub',
		URLs: 'http://www.gmail.com,http://github.com'
	}
}

var new_btn_button = '<a href="#" class="large_btn" id="create_btn" title="Create new button">+</a>';
var button_delete = '<span class="button_delete">X<span>';

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
	var title = '';
	while(title == ''){title = prompt('Text to be displayed on the button:');}
	var desc = prompt('Description of the tab(s) the button will open:');
	var tabs = prompt('Comma seperated list of URLs it will open (include "http://"):');

	if(title == null || desc == null || tabs == null){
		alert('Creation aborted.');
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
		$('#main_container').append('<a href="#" class="large_btn link_btn" title="'+desc+'">'+title+button_delete+'</a>');
	}
	$('#main_container').append(new_btn_button);
	
	set_click_events();
}

// <summary>
// Fetches info about button from dict, opens tabs
// </summary>
// <param name="button" type="DOM object"> The button that was clicked </param>
function btn_click(button){
	var title = button.innerHTML.split('<')[0]; // TODO investigate why this works and html() doesnt, but the inverse is true on line 79
	var tabs = buttons[title].URLs.split(',');
	for(var i = 0; i < tabs.length; i++){
		window.open(tabs[i]);
	}
}

// <summary>
// Deletes button from dictionary and refreshes everything
// </summary>
// <param name="button" type="DOM object"> The button to be deleted </param>
function delete_button(button){
	var title = button.html().split('<')[0];
	if(confirm('Are you sure you would like to delete "'+title+'"?')){
		delete buttons[title];
	}
	generate_buttons(buttons);
	save_buttons();
}

// <summary>
// Set onclick events for all elements
// </summary>
function set_click_events(){
	$('.link_btn').click(function(e){
		if(e.target === this){
			btn_click(this);
		}
	});

	$('#create_btn').click(function(){
		create_large_button();
	});

	$('.button_delete').click(function(){
		delete_button($(this).parent());
	});

	$('.button_delete').hide();
	$('.link_btn').mouseover(function(){
		$(this).find('.button_delete').show();
	});

	$('.link_btn').mouseout(function(){
		$(this).find('.button_delete').hide();
	});

}

// <summary>
// Prompts user for background location and stores in localstorage
// </summary>
function set_background(){
	var location = prompt('Location of the background image:');
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
	$('#outer_container').attr('style', 'background-image: '+bg);
}



// ### Weather stuff ###

var weather_location = 'London';
var api_key = 'ac7cdabe8761913417ab5b6f4eabfd7d'; // If you use this code, please sign up to OpenWeatherMap and get your own API key. It's free and stops mine reaching the request limit. Thanks!
var owm_endpoint = 'http://api.openweathermap.org/data/2.5/weather?q=';
var weather_data = '';

// <summary>
// Loads weather location from localstorage
// </summary>
function load_weather_location(){
	if(localStorage.getItem('newtabloc')){
		weather_location = localStorage.getItem('newtabloc');
	}
	fetch_weather(weather_location);
}

// <summary>
// Prompts user for location, saves to localstorage and refreshes
// </summary>
function set_location(){
	var location = prompt("Name of the city you would like weather information for:")
	if(location != null){
		localStorage.setItem('newtabloc', location);
	}
	load_weather_location();
}

// <summary>
// Fetches weather data from OpenWeatherMap
// </summary>
// <param name="location" type="string"> Location for weather info </param>
function fetch_weather(location){
	var request_url = owm_endpoint+location+'&APPID='+api_key;
	$.ajax({url: request_url, success:function(result){
		display_weather(result);
	}});
}

// <summary>
// Processes and displays weather data
// </summary>
function display_weather(data){
	var temp = to_celsius(data.main.temp);
	var condition = data.weather[0].main;
	var display_location = data.name+', '+data.sys.country;
	$("#location").html('Weather for '+display_location);
	$("#weather").html(temp+'&deg;C, '+condition);
	console.log(data);
}


// <summary>
// Converts kelvin to celcius and rounds to 1 d.p.
// </summary>
// <param name="k" type="number"> Temperature in kelvin </param>
// <returns> Temperature in celcius </returns>
function to_celsius(k) {
    return Math.round((k-273)* 10)/10;
}




$(document).ready(function(){

	load_buttons();
	generate_buttons(buttons);
	load_weather_location();

	load_background();

});