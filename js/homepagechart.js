$(document).ready(function(){
		var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

		var barChartData = {
			labels : ["HTML5","CSS3","MySQL","PHP","jQuery", "Photoshop", "Sleeping"],
			datasets : [
				{
					fillColor : "rgba(210,210,210,0.9)",
					strokeColor : "rgba(220,220,220,1)",
					highlightFill: "rgba(200,200,200,1)",
					highlightStroke: "rgba(200,200,200,1)",
					data : [100,89,70,95,87,90, 10]
				}
			]
		}

		window.onload = function(){
			var ctx = document.getElementById("barChart").getContext("2d");
			window.myBar = new Chart(ctx).Bar(barChartData, {
			responsive : true
		});
	}
});