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


    /*==========  Contact Form validation & Google Sheets Submission  ==========*/
    var contactForm = $("#contactForm");
    if (contactForm.length) {
        contactForm.validate({
            debug: false,
            submitHandler: function (form, event) {
                if (event) event.preventDefault();
                
                // Manually validate custom NiceSelect dropdown since it's hidden from native validation
                var serviceSelect = document.getElementById('serviceSelect');
                if (serviceSelect && serviceSelect.value === "") {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Service Required!',
                        text: 'Please select a service from the dropdown list before submitting.',
                        confirmButtonColor: '#1E40AF',
                        confirmButtonText: 'OK'
                    });
                    return false;
                }

                // Check honeypot anti-bot field
                var honeypot = document.getElementById('honeypot-field');
                if (honeypot && honeypot.value !== '') {
                    // Bot detected — silently block submission
                    return false;
                }

                // Validate Cloudflare Turnstile CAPTCHA token
                var turnstileResponse = form.querySelector('[name="cf-turnstile-response"]');
                if (!turnstileResponse || !turnstileResponse.value) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Verification Required',
                        text: 'Please complete the security verification before submitting.',
                        confirmButtonColor: '#1E40AF',
                        confirmButtonText: 'OK'
                    });
                    return false;
                }

                var submitBtn = form.querySelector('button[type="submit"]');
                var originalText = submitBtn.innerHTML;

                // Loading state
                submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> <span>Sending...</span>';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.8';

                // URL encode the form data so Google Apps Script can parse it in e.parameter
                var formData = new FormData(form);
                // Remove honeypot field from data sent to server
                formData.delete('company_website');
                var urlEncodedData = new URLSearchParams(formData);

                fetch(form.action, {
                    method: 'POST',
                    body: urlEncodedData,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(function(data) {
                    if (data.result === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Request Sent Successfully!',
                            text: 'Thank you! One of our master roofers will contact you shortly to coordinate the free inspection.',
                            confirmButtonColor: '#1E40AF',
                            confirmButtonText: 'Great!',
                            background: '#ffffff',
                            customClass: {
                                title: 'font-outfit font-weight-bold',
                                popup: 'border-radius-12'
                            }
                        });
                        form.reset();
                        // Reset NiceSelect dropdown UI
                        $(serviceSelect).val('').niceSelect('update');
                    } else {
                        throw new Error(data.error || 'The script returned an error.');
                    }
                })
                .catch(function(error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong. Please try again or call us directly at +353 83 868 0611.',
                        confirmButtonColor: '#1E40AF'
                    });
                    console.error('Form submission error:', error);
                })
                .finally(function() {
                    // Restore button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    // Reset Turnstile widget for re-submission
                    if (typeof turnstile !== 'undefined') {
                        turnstile.reset();
                    }
                });

                return false;
            }
        });
    }

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