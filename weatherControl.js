force_scale = "c"; // Celsius scale
	//force_scale = "f"; // Fahrenheit scale
	$(document).ready(function () { 
		jqxhr = $.get("http://api.wunderground.com/api/0a81bd3368989dc9/forecast/geolookup/q/GB/Paisley.xml");
		jqxhr.complete(function () {
			force_scale = force_scale.substring(0, 1).toUpperCase();
			if (force_scale != "F") force_scale = "C";
			$("#location_date").append($(jqxhr.responseXML).find("city:first").text()); 
			$("#location_date").append(",&nbsp;"); 
			$("#location_date").append($(jqxhr.responseXML).find("country_name:first").text()); 
			$("#location_date").append("&nbsp;"); 
			$("#location_date").append($(jqxhr.responseXML).find("year:first").text()); 
			$("#location_date").append("-"); 
			$("#location_date").append($(jqxhr.responseXML).find("month:first").text()); 
			$("#location_date").append("-"); 
			$("#location_date").append($(jqxhr.responseXML).find("day:first").text());
			$(jqxhr.responseXML).find("simpleforecast forecastday").each(function (index) { if(index>2) return false; day_of_week = $(this).find("weekday_short").text();
				$("#day" + index + " .day").append(day_of_week);
				icon_url = $(this).find("icon_url").text();
				conditions = $(this).find("conditions").text();
				// blank line
				img = $("<img />").attr("src", icon_url).attr("alt", conditions);
				$("#day" + index + " .icon").append(img);
				if (force_scale == "F") {
					high = $(this).find("high fahrenheit").text();
					low = $(this).find("low fahrenheit").text();
					// blank line
				} else {
					high = $(this).find("high celsius").text();
					low = $(this).find("low celsius").text();
					// blank line
				}
				$("#day" + index + " .high").append(high);
				$("#day" + index + " .low").append(low);
			});
			if (force_scale == "F") {
				$(".temp").append("&deg;F");
				// blank line
			} else {
				$(".temp").append("&deg;C");
				// blank line
			}
		});
	});