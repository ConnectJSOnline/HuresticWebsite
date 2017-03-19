        // loader 
      $(window).load(function() { // makes sure the whole site is loaded
      $('#status').fadeOut(); // will first fade out the loading animation
      $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
      $('body').delay(350).css({'overflow':'visible'});
      })

        // Sticky Header
        $(window).scroll(function() {

            if ($(window).scrollTop() > 100) {
                $('.main_header').addClass('sticky');
            } else {
                $('.main_header').removeClass('sticky');
            }
        });

        // Mobile Navigation
        $('.mobile-toggle').click(function() {
            if ($('.main_header').hasClass('open-nav')) {
                $('.main_header').removeClass('open-nav');
            } else {
                $('.main_header').addClass('open-nav');
            }
        });

        $('.main_header li a').click(function() {
            if ($('.main_header').hasClass('open-nav')) {
                $('.navigation').removeClass('open-nav');
                $('.main_header').removeClass('open-nav');
            }
        });

        // navigation scroll lijepo radi materem
        $('nav a').click(function(event) {
            var id = $(this).attr("href");
            var offset = 70;
            var target = $(id).offset().top - offset;
            $('html, body').animate({
                scrollTop: target
            }, 500);
            event.preventDefault();
        });



        // wow js
    
    new WOW().init();

        // nice scroll

      $(document).ready(

        function() { 

          $("html").niceScroll({cursorwidth:"8",cursorborderradius:"none",cursorborder:"none",cursorcolor:"#3498db",mousescrollstep:"60"});

        }

      ); 

      // portfolio filter

      $(function () {
        
        var filterList = {
        
          init: function () {
          
            // MixItUp plugin
            // http://mixitup.io
            $('#portfoliolist').mixitup({
              targetSelector: '.portfolio',
              filterSelector: '.filter',
              effects: ['fade'],
              easing: 'snap',
              // call the hover effect
              onMixEnd: filterList.hoverEffect()
            });       
          
          },
          
          hoverEffect: function () {
          
            // Simple parallax effect
            $('#portfoliolist .portfolio').hover(
              function () {
                $(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
                $(this).find('img').stop().animate({top: -30}, 500, 'easeOutQuad');       
              },
              function () {
                $(this).find('.label').stop().animate({bottom: -40}, 200, 'easeInQuad');
                $(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');               
              }   
            );        
          
          }

        };
        
        // Run the show!
        filterList.init();
        
        
      }); 


      // Skillset js 

      var object = [

        {

          'headline':'Software',
          'value':9,
          'length':10,
          'description':''

        },
        {

          'headline':'Realtime Embedded Systems and Electronics',
          'value':8,
          'length':10,
          'description':''

        },
        {

          'headline':'Product Development and Sales',
          'value':9,
          'length':10,
          'description':''

        },
        {

            'headline': 'Customer Experience and Feedback',
            'value': 10,
            'length': 10,
            'description': ''

        }

      ];

      $(document).ready(function(){

        $("#skillset").skillset({

          object:object,
          duration:40

        });

      });


        // Owl carousel

      $(document).ready(function() {
               
      $("#testimonial_carosule").owlCarousel({
               
                    slideSpeed : 5000,
                    paginationSpeed : 5000,
                    singleItem:true,
                    autoPlay : true,
                    transitionStyle : "backSlide"
                    // "singleItem:true" is a shortcut for:
                    // items : 1, 
                    // itemsDesktop : false,
                    // itemsDesktopSmall : false,
                    // itemsTablet: false,
                    // itemsMobile : false
               
                });
               
      });

      // Up to top js

      $(document).ready(function() {
        
        $().UItoTop({ easingType: 'easeOutQuart' });
        
      });



/* ==========================================================================
   CONTACT FORM JS
   ========================================================================== */

  $(document).ready(function() {

      var isbypassed = window.location.href.toLowerCase().indexOf('?noemail') > -1;

      if (isbypassed)
          $("#save_btn").show();

      $("#submit_btn,#save_btn").click(function () {
          //get input field values
          var user_name       = $('input[name=name]').val(); 
          var user_email      = $('input[name=email]').val();
          var user_phone      = $('input[name=phone]').val();
          var user_message    = $('textarea[name=message]').val();
          
          //simple validation at client's end
          //we simply change border color to red if empty field using .css()
          var proceed = true;
          if(user_name==""){ 
              $('input[name=name]').css('border-color','red'); 
              proceed = false;
          }
          if(user_email==""){ 
              $('input[name=email]').css('border-color','red'); 
              proceed = false;
          }
          if(user_phone=="") {    
              $('input[name=phone]').css('border-color','red'); 
              proceed = false;
          }
          if(user_message=="") {  
              $('textarea[name=message]').css('border-color','red'); 
              proceed = false;
          }

          //everything looks good! proceed...
          if(proceed) 
          {
              
              if (!isbypassed)
              {
                  $("#submit_btn").attr("disabled", "disabled");
                  $("#submit_btn").text("Sending...");
              }
                  
              else
              {
                  $("#save_btn").attr("disabled", "disabled");
                  $("#save_btn").text("Saving...");
              }
                 

              //data to be sent to server
              post_data = {'userName':user_name, 'userEmail':user_email, 'userPhone':user_phone, 'userMessage':user_message};
              

              var url = isbypassed ? 'http://tbdautomations.azurewebsites.net/api/Services/SaveContact' : 'http://tbdautomations.azurewebsites.net/api/Services/SendEmail';

              //Ajax post data to server
              $.post(url, post_data, function (response) {
                  
                  //load json data from server and output message     
                  if(response.type == 'error')
                  {
                      output = '<div class="error">'+response.text+'</div>';
                  }else{
                  
                      output = '<div class="success">'+response.text+'</div>';
                      
                      //reset values in all input fields
                      $('#contact_form input').val(''); 
                      $('#contact_form textarea').val(''); 
                  }
                  
                  $("#result").hide().html(output).slideDown();

                  
                  


                  if (!isbypassed) {
                      $("#submit_btn").removeAttr("disabled");
                      $("#submit_btn").text("Send");
                  }

                  else {
                      $("#save_btn").removeAttr("disabled");
                      $("#save_btn").text("Send");
                  }



              }, 'json');
              
          }
      });
      
      //reset previously set border colors and hide all message on .keyup()
      $("#contact_form input, #contact_form textarea").keyup(function() { 
          $("#contact_form input, #contact_form textarea").css('border-color',''); 
          $("#result").slideUp();
      });
      
  });