var buttons = {
	'Usual': {
		desc: 'Gmail and YouTube',
		URLs: 'https://www.youtube.com'
	}
}

var new_btn_button = '<a href="#" class="large_btn" id="create_btn">+</a>';


// <summary>
// Prompts user to get inputs, validates what needs validating and adds to dictionary
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
		$('#main_container').append('<a href="#" class="large_btn" title="'+desc+'">'+title+'</a>');
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
	$('.large_btn').click(function(){
		btn_click(this);
	});

	$('#create_btn').click(function(){
		create_large_button();
	});
}


$(document).ready(function(){

	generate_buttons(buttons);
	set_click_events();

});