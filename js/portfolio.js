/*
 * This product is a Ehan Technology Product 
 * All right reserved
*/
$(document).ready(function(){

	$("div.portfolio span").click(function(){
		//var thisIndex = $(this).index();
		var thisValue = $(this).attr("data-portfolio");
		$("div.portfolioItem").fadeOut("slow");

		/* If clicked All Button */
		if( $(this).attr("data-portfolio") == "all" ) {
			$(".portfolioItem").fadeIn("slow");
		}

		/* If clicked category button then fadeOut this */
		if(thisValue != "all" ) {
			$("div.portfolioItem[data-item='"+thisValue+"']").toggle("slow");
		}
	});
});