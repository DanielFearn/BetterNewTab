// Weather widget

var ww = {
	weather_location: 'London',
	api_key: 'ac7cdabe8761913417ab5b6f4eabfd7d', // If you use this code, please sign up to OpenWeatherMap and get your own API key. It's free and stops mine reaching the request limit. Thanks!
	owm_endpoint: 'http://api.openweathermap.org/data/2.5/weather?q=',
	weather_data: '',

	// <summary>
	// Loads weather location from localstorage
	// </summary>
	load_weather_location: function(){
		if(localStorage.getItem('newtabloc')){
			this.weather_location = localStorage.getItem('newtabloc');
		}
		this.fetch_weather();
	},

	// <summary>
	// Prompts user for location, saves to localstorage and refreshes
	// </summary>
	set_location: function(){
		var location = prompt("Name of the city you would like weather information for:")
		if(location != null){
			localStorage.setItem('newtabloc', location);
		}
		this.load_weather_location();
	},

	// <summary>
	// Fetches weather data from OpenWeatherMap
	// </summary>
	fetch_weather: function(){
		var request_url = this.owm_endpoint+this.weather_location+'&APPID='+this.api_key;
		$.ajax({url: request_url, success:function(result){
			ww.weather_data = result;
			ww.display_weather();
		}});
	},

	// <summary>
	// Processes and displays weather data
	// </summary>
	display_weather: function(){
		var data = this.weather_data;
		var temp = this.to_celsius(data.main.temp);
		var condition = data.weather[0].main;
		var display_location = data.name+', '+data.sys.country;
		$("#location").html('Weather for '+display_location);
		$("#weather").html(temp+'&deg;C, '+condition);
		console.log(data);
	},

	// <summary>
	// Converts kelvin to celcius and rounds to 1 d.p.
	// </summary>
	// <param name="k" type="number"> Temperature in kelvin </param>
	// <returns> Temperature in celcius </returns>
	to_celsius: function(k) {
	    return Math.round((k-273)* 10)/10;
	}

}