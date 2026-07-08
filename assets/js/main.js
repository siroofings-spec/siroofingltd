/*--------------------------
    Project Name: Amarou
    Version: 1.0
    Author: 7oorof
    Devloped by: Ahmed Abdallah (a.abdallah999@gmail.com)
    Relase Date: August 2020
---------------------------*/
/*---------------------------
      Table of Contents
    --------------------
    01- Pre Loading
    02- Mobile Menu
    03- Sticky Navbar
    04- Search Popup 
    05- Scroll Top Button
    06-  Scroll Top Button
    07- Set Background-img to section 
    08- Add active class to accordions
    09- Load More Items
    10- Slick Carousel
    11- Popup Video
    12- CounterUp
    13- NiceSelect Plugin
     
 ----------------------------*/

$(function () {

    "use strict";

    // Global variables
    var $win = $(window);

    /*==========  Pre Loading   ==========*/
    setTimeout(function () {
        $(".preloader").remove();
        $('.floating-actions').addClass('show-actions');
    }, 600);

    /*==========   Mobile Menu   ==========*/
    var $navToggler = $('.navbar-toggler');
    $navToggler.on('click', function () {
        $(this).toggleClass('actived');
    })
    $navToggler.on('click', function () {
        $('.navbar-collapse').toggleClass('menu-opened');
    })

    /*==========   Sticky Navbar (Disabled for permanent fixed header)   ==========*/

    /*==========  Search Popup  ==========*/
    $('.action-btn__search').on('click', function (e) {
        e.preventDefault();
        $('.search-popup').toggleClass('active', 'inActive').removeClass('inActive');
    });
    // Close Module Search
    $('.search-popup__close').on('click', function () {
        $('.search-popup').removeClass('active').addClass('inActive');
    });

    /*==========   Scroll Top Button   ==========*/
    var $scrollTopBtn = $('#scrollTopBtn');
    // Show Scroll Top Button
    $win.on('scroll', function () {
        if ($(this).scrollTop() > 700) {
            $scrollTopBtn.addClass('actived');
        } else {
            $scrollTopBtn.removeClass('actived');
        }
    });
    // Animate Body after Clicking on Scroll Top Button
    $scrollTopBtn.on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    /*==========   Set Background-img to section   ==========*/
    $('.bg-img').each(function () {
        var imgSrc = $(this).children('img').attr('src');
        $(this).parent().css({
            'background-image': 'url(' + imgSrc + ')',
            'background-size': 'cover',
            'background-position': 'center',
        });
        $(this).parent().addClass('bg-img');
        if ($(this).hasClass('background-size-auto')) {
            $(this).parent().addClass('background-size-auto');
        }
        $(this).remove();
    });

    /*==========   Add active class to accordions   ==========*/
    $('.accordion__item-header').on('click', function () {
        $(this).parent('.accordion-item').addClass('opened');
        $(this).parent('.accordion-item').siblings().removeClass('opened');
    })
    $('.accordion__item-title').on('click', function (e) {
        e.preventDefault()
    });

    /*==========   Load More Items  ==========*/
    function loadMore(loadMoreBtn, loadedItem) {
        $(loadMoreBtn).on('click', function (e) {
            e.preventDefault();
            $(this).fadeOut();
            $(loadedItem).fadeIn();
        })
    }

    loadMore('.loadMoreportfolio', '.portfolio-hidden > .portfolio-item');


    /*==========  Contact Form validation  ==========*/
    var contactForm = $("#contactForm"),
        contactResult = $('.contact-result');
    contactForm.validate({
        debug: false,
        submitHandler: function (contactForm) {
            $(contactResult, contactForm).html('Please Wait...');
            $.ajax({
                type: "POST",
                url: "assets/php/contact.php",
                data: $(contactForm).serialize(),
                timeout: 20000,
                success: function (msg) {
                    $(contactResult, contactForm).html('<div class="alert alert-success" role="alert"><strong>Thank you. We will contact you shortly.</strong></div>').delay(3000).fadeOut(2000);
                },
                error: $('.thanks').show()
            });
            return false;
        }
    });

    /*==========   Slick Carousel ==========*/
    $('.slick-carousel').on('init reInit', function (event, slick) {
        var currentSlide = slick.currentSlide || 0;
        var $dots = $(slick.$dots).find('li');
        if ($dots.length <= 3) {
            $dots.addClass('dot-visible');
            return;
        }
        var total = slick.slideCount;
        var visibleIndices = [
            currentSlide,
            (currentSlide + 1) % total,
            (currentSlide + 2) % total
        ];
        $dots.each(function (index) {
            if (visibleIndices.indexOf(index) !== -1) {
                $(this).addClass('dot-visible');
            } else {
                $(this).removeClass('dot-visible');
            }
        });
    });

    $('.slick-carousel').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var $dots = $(slick.$dots).find('li');
        if ($dots.length <= 3) {
            $dots.addClass('dot-visible');
            return;
        }
        var total = slick.slideCount;
        var visibleIndices = [
            nextSlide,
            (nextSlide + 1) % total,
            (nextSlide + 2) % total
        ];
        $dots.each(function (index) {
            if (visibleIndices.indexOf(index) !== -1) {
                $(this).addClass('dot-visible');
            } else {
                $(this).removeClass('dot-visible');
            }
        });
    });
    $('.slick-carousel').slick();

    /*==========  Popup Video  ==========*/
    $('.popup-video').magnificPopup({
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });
    $('.popup-gallery-item').magnificPopup({
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

    /*==========   counterUp  ==========*/
    $(".counter").counterUp({
        delay: 10,
        time: 4000
    });

    /*==========  NiceSelect Plugin  ==========*/
    $('select').niceSelect();

    /*==========  Service selection to contact form auto-fill  ==========*/
    $('.service-link').on('click', function (e) {
        var serviceVal = $(this).attr('data-service');
        if (serviceVal) {
            $('#serviceSelect').val(serviceVal).niceSelect('update');
        }
    });
});