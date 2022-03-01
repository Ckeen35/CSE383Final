var URL="https://api.clearllc.com/api/v2/miamidb/_table/zipcode?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&ids=";

function openNav() {
	document.getElementById("sideMenu").style.width = "250px";
}

function closeNav() {
	document.getElementById("sideMenu").style.width = "0";
}

function getInfo() {
	var zCode = document.getElementById("zip").value;
	a=$.ajax({
        	url: URL + zCode,
               	method: "GET"
        }).done(function(data){
               	$("#zipCode").html("");
               	$("#city").html("");
               	$("#state").html("");
               	$("#lat").html("");
               	$("#long").html("");
		$("#timeZone").html("");
		$("#zipCode").append(data["resource"][0]["zip"]);
               	$("#city").append(data["resource"][0]["city"]);
               	$("#state").append(data["resource"][0]["state"]);
               	$("#lat").append(data["resource"][0]["latitude"]);
               	$("#long").append(data["resource"][0]["longitude"]);
		$("#timeZone").append(getTZone(data["resource"][0]["timezone"]));
               	//setTimeout(getDisk,1000);
        }).fail(function(error){
		document.getElementById("errorMsg").innerHTML = "Error: " + error["error"]["message"];
               	//setTimeout(getDisk,1000);
        });
}

function getTZone(timeZone){
	if(timeZone == -10)
		return "HST";
	else if(timeZone == -9)
		return "AKST";
	else if(timeZone == -8)
                return "PST";
	else if(timeZone == -7)
                return "MST";
        else if(timeZone == -6)
                return "CST";
        else if(timeZone == -5)
                return "EST";
}
