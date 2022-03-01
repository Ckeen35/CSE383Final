var URL="https://api.clearllc.com/api/v2/miamidb/_table/zipcode?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&ids=",URL2="https://api.openweathermap.org/data/2.5/onecall?lat=", lat, lon, d = new Date(), n = d.getDay(), m = d.getMonth(), day = d.getDate();
function openNav() {
        document.getElementById("sideMenu").style.width = "250px";
}

function closeNav() {
        document.getElementById("sideMenu").style.width = "0";
}

function getForecast() {
        var zCode = document.getElementById("zip").value;
        a=$.ajax({
                url: URL + zCode,
                method: "GET"
        }).done(function(data){
                lat = data["resource"][0]["latitude"];
                lon = data["resource"][0]["longitude"];
		$("#ttl").html("");
		$("#ttl").append("Forecast: " + data["resource"][0]["city"] + ", " + data["resource"][0]["state"]);
                //setTimeout(getDisk,1000);
		c=$.ajax({
                	url: URL2 + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=c96d21974eedb7869981a4c1b4cf4ab4",
                	method: "GET"
        	}).done(function(data){
                	for(var i = 0; i < 7; i++){
                        	$("#date" + (i + 1)).html("");
                        	$("#hi" + (i + 1)).html("");
                        	$("#lo" + (i + 1)).html("");
                        	$("#desc" + (i + 1)).html("");
                        	$("#pic" + (i + 1)).html("");
                        	$("#date" + (i + 1)).append(weekDay(n) + " " + (m+1) + "/" + day);
                        	$("#hi" + (i + 1)).append(Math.round(data["daily"][i]["temp"]["max"]));
                        	$("#lo" + (i + 1)).append(Math.round(data["daily"][i]["temp"]["min"]));
                        	$("#desc" + (i + 1)).append(data["daily"][i]["weather"][0]["description"]);
                		$("#pic" + (i + 1)).append("<img src='http://openweathermap.org/img/wn/" + data["daily"][i]["weather"][0]["icon"] + ".png' alt='icon'>");
				sendTemp(m+1, day, zCode, Math.round(data["daily"][i]["temp"]["min"]), Math.round(data["daily"][i]["temp"]["max"]), data["daily"][i]["weather"][0]["description"]);
				n++; day++;
                        	if (n == 7)
                                	n = 0;
			}
			n = d.getDay(); day = d.getDate();
			//setTimeout(getDisk,1000);
        	}).fail(function(error){
                	document.getElementById("errorMsg").innerHTML = "Error: " + error["error"]["message"];
                	//setTimeout(getDisk,1000);
        	});
	}).fail(function(error){
                document.getElementById("errorMsg").innerHTML = "Error: " + error["error"]["message"];
                //setTimeout(getDisk,1000);
        });

}

function weekDay(dayNum){
	if(dayNum == 0)
		return "Sunday"
	else if(dayNum == 1)
		return "Monday"
        else if(dayNum == 2)
                return "Tuesday"
        else if(dayNum == 3)
                return "Wednesday"
        else if(dayNum == 4)
                return "Thursday"
        else if(dayNum == 5)
                return "Friday"
        else if(dayNum == 6)
                return "Saturday"
}
function sendTemp(m, n, zipCode, low, high, forecast) {
	b=$.ajax({
		url: "https://keenct.aws.csi.miamioh.edu/final.php?method=setTemp&date=" + d.getFullYear() + "-0" + m + "-" + n + "&location=" + zipCode + "&low=" + low + "&high=" + high + "&forecast=" + forecast,
                method: "POST"
        }).done(function(data) {
		//setTimeout(getDisk,1000);
        }).fail(function(error){
		//setTimeout(getDisk,1000);
        });
}
