// clock widget

var clock = {
	months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	prev_hour: 0,
	
	// <summary>
	// Loops every .5 seconds to update clock
	// </summary>
	update_time: function(){
		var now = new Date();
		clock.render_time(now);
		var timer = setTimeout(clock.update_time, 10000);
	},

	// <summary>
	// Renders date-time object into the clock widget
	// </summary>
	// <param name="now" type="date"> The date-time object </param>
	render_time: function(now){
		var h = now.getHours();

		// update weather hourly
		if(h != this.prev_hour){
			ww.fetch_weather();
		}
		this.prev_hour = h;
		console.log("tick");



		var m = now.getMinutes();
		$('#time').html(h+':'+m);

		var d = now.getDate();
		var mth = this.months[now.getMonth()];
		var y = now.getFullYear();

		var ext = this.get_extension(d);

		$('#date').html(mth+' '+d+ext+', '+y);
	},

	// <summary>
	// Calculates extension for date e.g. st, nd, rd
	// </summary>
	// <param name="date" type="number"> Day of the month </param>
	// <returns> Extension </returns>
	get_extension: function(date){
		var ext;
		switch(date % 20){
			case 1:
				ext = 'st';
				break;
			case 2:
				ext = 'nd';
				break;
			case 3:
				ext = 'rd';
				break;
			default:
				if(date == 31){
					ext = 'st';
				}else{
					ext = 'th';
				}
		}

		return ext;
	}
}