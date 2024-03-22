$(function(){
	"use strict";
	
	var sect = $( window.location.hash ),
		portfolio = $('.portfolio-items');
	
	if(sect.length == 1){
		$('.section.active').removeClass('active');
		sect.addClass('active');
		if( sect.hasClass('border-d') ){
			$('body').addClass('border-dark');
		}
	}
	
	/*=========================================================================
		Magnific Popup (Project Popup initialization)
	=========================================================================*/
	$('.view-project').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in',
		gallery: {
		  enabled: true // Enable gallery functionality
		},
		// Add callbacks for previous and next buttons
		callbacks: {
		  update: function() {
			var index = this.index;
			var prevButton = $('.mfp-arrow mfp-arrow-left');
			var nextButton = $('.mfp-arrow mfp-arrow-right');
	  
			// Disable buttons if there's only one element
			if (this.items.length === 1) {
			  prevButton.hide();
			  nextButton.hide();
			} else {
			  prevButton.show();
			  nextButton.show();
			  
			  // Disable previous button for the first element
			  if (index === 0) {
				prevButton.addClass('mfp-disabled');
			  } else {
				prevButton.removeClass('mfp-disabled');
			  }
			  
			  // Disable next button for the last element
			  if (index === this.items.length - 1) {
				nextButton.addClass('mfp-disabled');
			  } else {
				nextButton.removeClass('mfp-disabled');
			  }

			}
		  },
		  open: function() {
			var popup = this; // Reference the current popup object
			var iframeContainer = $('#iframe-container'); // Select iframe container
		
			// Check if the current popup has an iframe container
			if (iframeContainer.length) {
			  var iframeUrl;
		
			  // Retrieve iframe URL from data attribute
			  iframeUrl = $(popup.st.el).attr('data-iframe-url');
		
			  // Create and configure the iframe element (unchanged)
			  var iframe = $('<iframe>')
				.attr('src', iframeUrl)
				.attr('frameborder', 0)
				.attr('allowfullscreen', true);
		
			  // Append the iframe to the container and show it (unchanged)
			  iframeContainer.html(iframe);
			  iframe.show();
			}
		  },
		  close: function() {
			// Remove the iframe from the container when the popup closes
			$('#iframe-container').html('');
		  }
		}
	  });
	
	$(window).on('load', function(){
		$('body').addClass('loaded');
		
		/*=========================================================================
			Portfolio Grid
		=========================================================================*/
		portfolio.shuffle();
		$('.portfolio-filters > li > a').on('click', function (e) {
			e.preventDefault();
			var groupName = $(this).attr('data-group');
			$('.portfolio-filters > li > a').removeClass('active');
			$(this).addClass('active');
			portfolio.shuffle('shuffle', groupName );
		});
		
	});
	
	/*=========================================================================
		Navigation Functions
	=========================================================================*/
	$('.section-toggle').on('click', function(){
		var $this = $(this),
			sect = $( '#' + $this.data('section') ),
			current_sect = $('.section.active');
		if(sect.length == 1){
			if( sect.hasClass('active') == false && $('body').hasClass('section-switching') == false ){
				$('body').addClass('section-switching');
				if( sect.index() < current_sect.index() ){
					$('body').addClass('up');
				}else{
					$('body').addClass('down');
				}
				setTimeout(function(){
					$('body').removeClass('section-switching up down');			
				}, 2500);
				setTimeout(function(){
					current_sect.removeClass('active');
					sect.addClass('active');
				}, 1250);
				if( sect.hasClass('border-d') ){
					$('body').addClass('border-dark');
				}else{
					$('body').removeClass('border-dark');
				}
			}
		}
	});
	/*========================================================================
        Form Submission
    	=========================================================================*/

	const form = document.getElementById('contact-form');
    	const result = document.getElementById('result');

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		const formData = new FormData(form);
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);
		result.innerHTML = "Please wait..."

        fetch('https://api.web3forms.com/submit', {
		method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = json.message;
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 3000);
            });
    });
	
});
