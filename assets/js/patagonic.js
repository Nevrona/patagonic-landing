$(document).ready(function() {
    $('#main-nav').scrollToFixed();
    $('.res-nav_click').click(function(){
        $('.main-nav').slideToggle();
        return false;
    });
});

wow = new WOW({
    animateClass: 'animated',
    offset:       100
});
wow.init();

$(window).load(function(){
    $('.main-nav li a').bind('click',function(event){
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 102
        }, 1500,'easeInOutExpo');
        /*
        if you don't want to use the easing effects:
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000);
        */
        event.preventDefault();
    });

    $('.header div div div a').bind('click',function(event){
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top}, 1500,'easeInOutExpo');
        /*
        if you don't want to use the easing effects:
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000);
        */
        event.preventDefault();
    });
});

$(window).load(function(){
    var $container = $('.portfolioContainer'),
        $body = $('body'),
        colW = 375,
        columns = null;


    $container.isotope({
        // disable window resizing
        resizable: true,
        masonry: {
            columnWidth: colW
        }
    });

    $(window).smartresize(function(){
        // check if columns has changed
        var currentColumns = Math.floor( ( $body.width() -30 ) / colW );
        if ( currentColumns !== columns ) {
          // set new column count
          columns = currentColumns;
          // apply width to container manually, then trigger relayout
          $container.width( columns * colW )
            .isotope('reLayout');
        }

    }).smartresize(); // trigger resize to set container width

    $('.portfolioFilter a').click(function(){
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector
        });
        return false;
    });
});


/* hide arrow on scroll */
$(document).on('scroll', function() {
    if ($(this).scrollTop() >= ($('#main-nav').position().top)/5) {
        $('.arrow').hide();
    } else {
        $('.arrow').show();
    }
});
/*--*/

// Formspree contact form
//https://gist.github.com/edmundojr/975b08c39ab0a7a1b514
//https://gist.github.com/jannecederberg/785c1dc78e882b6bf85a5e77b31b0678

var $contactForm = $('#contact-form');
$contactForm.submit(function(e) {
    e.preventDefault();
    var $submit = $('input:submit', $contactForm);
    var defaultSubmitText = $submit.val();
    var defaultSubmitTitle = $submit.prop('title');

    $.ajax({
        url: 'https://formspree.io/patagonic@hmamail.com',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        beforeSend: function() {
            $submit.attr('disabled', true).val('Enviando...');
        },
        success: function(data) {
            $submit.val('¡Enviado!');
            setTimeout(function() {
                $submit.attr('disabled', false).val(defaultSubmitText);
            }, 5000);
        },
        error: function(err) {
            $submit.val('Error').prop('title', 'Por favor reintente');
            setTimeout(function() {
                $submit.attr('disabled', false).val(defaultSubmitText).prop('title', defaultSubmitTitle);
            }, 5000);
        }
    });
});
