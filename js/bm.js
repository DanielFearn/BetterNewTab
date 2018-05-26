// rewriting script.js with object notation to improve maintainability

var bm = { //button manager
	
	buttons: {
		'Demo': {
			desc: 'Gmail and GitHub',
			URLs: 'http://www.gmail.com,http://github.com'
		}
	},

	new_btn_button: '<a href="#" class="large_btn" id="create_btn" title="Create new button">+</a>',
	button_delete: '<span class="button_delete">X<span>',

	// <summary>
	// Saves button dictionary to localstorage
	// </summary>
	save_buttons: function(){
		var button_string = JSON.stringify(buttons);
		localStorage.setItem('newtabbuttons', button_string);
	},

	// <summary>
	// Loads and parses button dictionary from localstorage
	// </summary>
	load_buttons: function(){
		if(localStorage.getItem('newtabbuttons')){
			this.buttons = JSON.parse(localStorage.getItem('newtabbuttons'));
		}
	},

	// <summary>
	// Prompts user to get inputs, validates that title isn't empty and that none are null and adds to dictionary
	// </summary>
	create_button: function(){
		var title = '';
		while(title == ''){title = prompt('Text to be displayed on the button:');}
		var desc = prompt('Description of the tab(s) the button will open:');
		var tabs = prompt('Comma seperated list of URLs it will open (include "http://"):');

		if(title == null || desc == null || tabs == null){
			alert('Creation aborted.');
		}else{
			this.buttons[title] = {desc: desc, URLs: tabs};
			this.generate_buttons();
			this.save_buttons();
		}
	},

	// <summary>
	// Uses a dictionary of buttons to append <a> elements to container
	// </summary>
	generate_buttons: function(){
		$('#main_container').empty();
		for(var title in this.buttons){
			var desc = this.buttons[title].desc;
			$('#main_container').append('<a href="#" class="large_btn link_btn" title="'+desc+'">'+title+button_delete+'</a>');
		}
		$('#main_container').append(new_btn_button);
		
		set_click_events();
	},

	// <summary>
	// Fetches info about button from dict, opens tabs
	// </summary>
	// <param name="button" type="jQuery object"> The button that was clicked </param>
	btn_click: function(button){
		var title = button.html().split('<')[0];
		var tabs = buttons[title].URLs.split(',');
		for(var i = 0; i < tabs.length; i++){
			window.open(tabs[i]);
		}
	},

	// <summary>
	// Deletes button from dictionary and refreshes everything
	// </summary>
	// <param name="button" type="jQuery object"> The button to be deleted </param>
	delete_button: function(button){
		var title = button.html().split('<')[0];
		if(confirm('Are you sure you would like to delete "'+title+'"?')){
			delete this.buttons[title];
		}
		generate_buttons();
		save_buttons();
	},

	// <summary>
	// Set onclick events for all elements
	// </summary>
	set_click_events: function(){
		$('.link_btn').click(function(e){
			if(e.target === this){
				btn_click($(this));
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

	},

	

}