var URL = "https://keenct.aws.csi.miamioh.edu/final.php?method=getTemp&date=";
getHistory();
function openNav() {
  document.getElementById("sideMenu").style.width = "250px";
}

function closeNav() {
  document.getElementById("sideMenu").style.width = "0";
}

function getHistory(){
	var address = document.getElementById("reqDate").value + "&sort=" + document.getElementById("sort").value;
	a=$.ajax({
		url: URL + address,
		method: "GET"
	}).done(function(data){
		$("#tempList").html("");
		for(var i = 0; i < data["result"].length; i++){
			$("#tempList").append("&emsp;" + data["result"][i]["location"] + "&emsp;&emsp;" + data["result"][i]["date"] + "&emsp;&emsp;" + data["result"][i]["DateRequested"] + "&emsp;&emsp;" + data["result"][i]["Low"] + "&emsp;&emsp;&emsp;" + data["result"][i]["High"] + "&emsp;&emsp;&emsp;" + data["result"][i]["Forecast"] + "<br>");
		}
		//setTimeout(getDisk,1000);
	}).fail(function(error){
		//setTimeout(getDisk,1000);
	});
}
