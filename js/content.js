/*  ################################################################

	File Name: content.js
	Template Name: Silent HTML5 Template
	Created By: Enver AVCIOĞLU
	http://themeforest.net/user/EhanTechnology

	1) PRELOADER
	2) BXSLIDER OPTIONS
	3) STICKY NAVBAR
	4) NAVBAR WITH SCROLL
	5) COUNT TO
	6) IMAGE LIGHTBOX
	7) DIV WAYPOINTS EFFECTS
	8) SLOWY SCROLL
	9) SLICK NAV ( RESPONSIVE MOBILE MENU )
	10) CAROUSEL SLIDERS
	11) BOOTSTRAP TAB
	12) SEARCH AREA
	13) DELETEMOBILE ADDMOBILE
	14) PARALLAX

################################################################# */ 


/*###########################################################################
####
#### PRELOADER
####
############################################################################*/

$(window).load(function(){$(function(){$("#preloader").fadeOut();});});
$(document).ready(function(){

/*###########################################################################
####
#### BXSLIDER OPTIONS
####
############################################################################*/
	$('.bxslider').bxSlider({
	  auto: true,
	  autoControls: true
	});

/*###########################################################################
####
#### STICKY NAVBAR
####
############################################################################*/
	/* Sticky Navbar */
	$("#NavBar").sticky({topSpacing:0});

/*###########################################################################
####
#### NAVBAR WITH SCROLL
####
############################################################################*/
	/* Navbar Scroll Setting */
	var waypoint = new Waypoint({
	  element: document.getElementById('NavBar'),
	  handler: function(direction) {
		/* Her 90px indiğinde bu işlemi yap */
		if (direction === 'down') {
			/* CSS Customize */
			$("nav#NavBar").removeClass("scrollTop transition");
			$("nav#NavBar").addClass("scrollBottom transition");
			
		} else {
			$("nav#NavBar").removeClass("scrollBottom transition");
			$("nav#NavBar").addClass("scrollTop transition");
		}
	  },
	  offset: -90 
	});

/*###########################################################################
####
#### COUNT TO
####
############################################################################*/
	var waypoints = $('#workHistory').waypoint({
	  handler: function(direction) {
			/* Run Countto */
			$('.timer').countTo();
	  },
	  offset: '98%'
	});

/*###########################################################################
####
#### IMAGE LIGHTBOX
####
############################################################################*/
	$( function()
	{
			// ACTIVITY INDICATOR

		var activityIndicatorOn = function()
			{
				$( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
			},
			activityIndicatorOff = function()
			{
				$( '#imagelightbox-loading' ).remove();
			},


			// OVERLAY

			overlayOn = function()
			{
				$( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
			},
			overlayOff = function()
			{
				$( '#imagelightbox-overlay' ).remove();
			},


			// CLOSE BUTTON

			closeButtonOn = function( instance )
			{
				$( '<button type="button" id="imagelightbox-close" title="Close"></button>' ).appendTo( 'body' ).on( 'click touchend', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
			},
			closeButtonOff = function()
			{
				$( '#imagelightbox-close' ).remove();
			},


			// CAPTION

			captionOn = function()
			{
				var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img' ).attr( 'alt' );
				if( description.length > 0 )
					$( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
			},
			captionOff = function()
			{
				$( '#imagelightbox-caption' ).remove();
			},


			// NAVIGATION

			navigationOn = function( instance, selector )
			{
				var images = $( selector );
				if( images.length )
				{
					var nav = $( '<div id="imagelightbox-nav"></div>' );
					for( var i = 0; i < images.length; i++ )
						nav.append( '<button type="button"></button>' );

					nav.appendTo( 'body' );
					nav.on( 'click touchend', function(){ return false; });

					var navItems = nav.find( 'button' );
					navItems.on( 'click touchend', function()
					{
						var $this = $( this );
						if( images.eq( $this.index() ).attr( 'href' ) != $( '#imagelightbox' ).attr( 'src' ) )
							instance.switchImageLightbox( $this.index() );

						navItems.removeClass( 'active' );
						navItems.eq( $this.index() ).addClass( 'active' );

						return false;
					})
					.on( 'touchend', function(){ return false; });
				}
			},
			navigationUpdate = function( selector )
			{
				var items = $( '#imagelightbox-nav button' );
				items.removeClass( 'active' );
				items.eq( $( selector ).filter( '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ).index( selector ) ).addClass( 'active' );
			},
			navigationOff = function()
			{
				$( '#imagelightbox-nav' ).remove();
			},


			// ARROWS

			arrowsOn = function( instance, selector )
			{
				var $arrows = $( '<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>' );

				$arrows.appendTo( 'body' );

				$arrows.on( 'click touchend', function( e )
				{
					e.preventDefault();

					var $this	= $( this ),
						$target	= $( selector + '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ),
						index	= $target.index( selector );

					if( $this.hasClass( 'imagelightbox-arrow-left' ) )
					{
						index = index - 1;
						if( !$( selector ).eq( index ).length )
							index = $( selector ).length;
					}
					else
					{
						index = index + 1;
						if( !$( selector ).eq( index ).length )
							index = 0;
					}

					instance.switchImageLightbox( index );
					return false;
				});
			},
			arrowsOff = function()
			{
				$( '.imagelightbox-arrow' ).remove();
			};


		//	WITH ACTIVITY INDICATION

		$( 'a[data-imagelightbox="a"]' ).imageLightbox(
		{
			onLoadStart:	function() { activityIndicatorOn(); },
			onLoadEnd:		function() { activityIndicatorOff(); },
			onEnd:	 		function() { activityIndicatorOff(); }
		});


		//	WITH OVERLAY & ACTIVITY INDICATION

		$( 'a[data-imagelightbox="b"]' ).imageLightbox(
		{
			onStart: 	 function() { overlayOn(); },
			onEnd:	 	 function() { overlayOff(); activityIndicatorOff(); },
			onLoadStart: function() { activityIndicatorOn(); },
			onLoadEnd:	 function() { activityIndicatorOff(); }
		});


		//	WITH "CLOSE" BUTTON & ACTIVITY INDICATION

		var instanceC = $( 'a[data-imagelightbox="c"]' ).imageLightbox(
		{
			quitOnDocClick:	false,
			onStart:		function() { closeButtonOn( instanceC ); },
			onEnd:			function() { closeButtonOff(); activityIndicatorOff(); },
			onLoadStart: 	function() { activityIndicatorOn(); },
			onLoadEnd:	 	function() { activityIndicatorOff(); }
		});


		//	WITH CAPTION & ACTIVITY INDICATION

		$( 'a[data-imagelightbox="d"]' ).imageLightbox(
		{
			onLoadStart: function() { captionOff(); activityIndicatorOn(); },
			onLoadEnd:	 function() { captionOn(); activityIndicatorOff(); },
			onEnd:		 function() { captionOff(); activityIndicatorOff(); }
		});


		//	WITH ARROWS & ACTIVITY INDICATION

		var selectorG = 'a[data-imagelightbox="g"]';
		var instanceG = $( selectorG ).imageLightbox(
		{
			onStart:		function(){ arrowsOn( instanceG, selectorG ); },
			onEnd:			function(){ arrowsOff(); activityIndicatorOff(); },
			onLoadStart: 	function(){ activityIndicatorOn(); },
			onLoadEnd:	 	function(){ $( '.imagelightbox-arrow' ).css( 'display', 'block' ); activityIndicatorOff(); }
		});


		//	WITH NAVIGATION & ACTIVITY INDICATION

		var selectorE = 'a[data-imagelightbox="e"]';
		var instanceE = $( selectorE ).imageLightbox(
		{
			onStart:	 function() { navigationOn( instanceE, selectorE ); },
			onEnd:		 function() { navigationOff(); activityIndicatorOff(); },
			onLoadStart: function() { activityIndicatorOn(); },
			onLoadEnd:	 function() { navigationUpdate( selectorE ); activityIndicatorOff(); }
		});


		//	ALL COMBINED

		var selectorF = 'a[data-imagelightbox="f"]';
		var instanceF = $( selectorF ).imageLightbox(
		{
			onStart:		function() { overlayOn(); closeButtonOn( instanceF ); arrowsOn( instanceF, selectorF ); },
			onEnd:			function() { overlayOff(); captionOff(); closeButtonOff(); arrowsOff(); activityIndicatorOff(); },
			onLoadStart: 	function() { captionOff(); activityIndicatorOn(); },
			onLoadEnd:	 	function() { captionOn(); activityIndicatorOff(); $( '.imagelightbox-arrow' ).css( 'display', 'block' ); }
		});

	});



/*###########################################################################
####
#### DIV WAYPOINTS EFFECTS
####
############################################################################*/
//<![CDATA[ 
        $(function(){
            function onScrollInit( items, trigger ) {
                items.each( function() {
                var osElement = $(this),
                    osAnimationClass = osElement.attr('data-os-animation'),
                    osAnimationDelay = osElement.attr('data-os-animation-delay');
                  
                    osElement.css({
                        '-webkit-animation-delay':  osAnimationDelay,
                        '-moz-animation-delay':     osAnimationDelay,
                        'animation-delay':          osAnimationDelay
                    });

                    var osTrigger = ( trigger ) ? trigger : osElement;
                    
                    osTrigger.waypoint(function() {
                        osElement.addClass('animated').addClass(osAnimationClass);
                        },{
                            triggerOnce: true,
                            offset: '90%'
                    });
                });
            }

            onScrollInit( $('.os-animation') );
            onScrollInit( $('.staggered-animation'), $('.staggered-animation-container') );
});//]]> 


/*###########################################################################
####
#### SLOWY SCROLL
####
############################################################################*/
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
});

/*###########################################################################
####
#### SLICK NAV ( RESPONSIVE MOBILE MENU )
####
############################################################################*/
$('.menuItem').slicknav();


/*###########################################################################
####
#### CAROUSEL SLIDERS
####
############################################################################*/
$("#owl-example").owlCarousel({paginationSpeed: 1000,slideSpeed: 200,autoPlay : true});
$("#sloganSlider").owlCarousel({paginationSpeed: 1000,slideSpeed: 200,autoPlay : true});
$("#testimonials").owlCarousel({paginationSpeed: 1000,slideSpeed: 200,items :3, autoPlay : true});
$("#twitterSlider").owlCarousel({paginationSpeed: 1000,slideSpeed: 200,items : 1,autoPlay : true});
$("#teamSlider").owlCarousel({paginationSpeed: 1000,slideSpeed: 200,items : 3,autoPlay : true});


/*###########################################################################
####
#### BOOTSTRAP TAB
####
############################################################################*/
$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})


/*###########################################################################
####
#### SEARCH AREA
####
############################################################################*/
	$("#searchPanelClose").hide();
	$("#siteSearchArea").hide();
	$("#searchPanelOpen").click(function(){
		$("#searchPanelOpen").hide();
		$("#searchPanelClose").show();
		$("#siteSearchArea").slideDown();
	});
	$("#searchPanelClose").click(function(){
		$("#searchPanelOpen").show();
		$("#searchPanelClose").hide();
		$("#siteSearchArea").slideUp();
	});
	

/*###########################################################################
####
#### DELETEMOBILE ADDMOBILE
####
############################################################################*/
$("div.slicknav_menu ul.slicknav_nav li.deleteMobile").hide();
$("div.slicknav_menu ul.slicknav_nav li.addMobile").show();


});


/*###########################################################################
####
#### PARALLAX
####
############################################################################*/
(function(){

  var parallax = document.querySelectorAll(".parallax"),
      speed = -1.8;

  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
          elBackgrounPos = "50% " + (windowYOffset * speed) + "px";
      
      el.style.backgroundPosition = elBackgrounPos;

    });
  };

})();