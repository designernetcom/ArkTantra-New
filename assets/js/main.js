(function ($) {
  "use strict";

  // ==========================================
  //      Start Document Ready function
  // ==========================================
  $(document).ready(function () {
    // ============== Mobile Nav Menu Dropdown Js Start =======================
    function toggleSubMenu() {
      if ($(window).width() <= 991) {
        $(".has-submenu")
          .off("click")
          .on("click", function () {
            $(this)
              .toggleClass("active")
              .siblings(".has-submenu")
              .removeClass("active")
              .find(".nav-submenu")
              .slideUp(300);
            $(this).find(".nav-submenu").stop(true, true).slideToggle(300);
          });
      } else {
        $(".has-submenu").off("click");
      }
    }

    toggleSubMenu();
    $(window).resize(toggleSubMenu);
    // ============== Mobile Nav Menu Dropdown Js End =======================

    // ===================== Scroll Back to Top Js Start ======================
    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });
    // ===================== Scroll Back to Top Js End ======================

    // ========================== add active class to navbar menu current page Js Start =====================
    function dynamicActiveMenuClass(selector) {
      let FileName = window.location.pathname.split("/").reverse()[0];

      // If we are at the root path ("/" or no file name), keep the activePage class on the Home item
      if (FileName === "" || FileName === "index.html") {
        // Keep the activePage class on the Home link
        selector
          .find("li.nav-menu__item.has-submenu")
          .eq(0)
          .addClass("activePage");
      } else {
        // Remove activePage class from all items first
        selector.find("li").removeClass("activePage");

        // Add activePage class to the correct li based on the current URL
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("activePage");
          }
        });

        // If any li has activePage element, add class to its parent li
        selector.children("li").each(function () {
          if ($(this).find(".activePage").length) {
            $(this).addClass("activePage");
          }
        });
      }
    }

    if ($("ul").length) {
      dynamicActiveMenuClass($("ul"));
    }
    // ========================== add active class to navbar menu current page Js End =====================

    // ========================== Settings Panel Js Start =====================
    $(".settings-button").on("click", function () {
      $(".settings-panel").toggleClass("active");
      $(this).toggleClass("active");
    });

    $(document).on(
      "click",
      ".settings-panel__buttons .settings-panel__button",
      function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      },
    );

    // Cursor start
    $(".cursor-animate").on("click", function () {
      $("body").removeClass("remove-animate-cursor");
    });

    $(".cursor-default").on("click", function () {
      $("body").addClass("remove-animate-cursor");
    });
    // Cursor end

    // Direction start
    $(".direction-ltr").on("click", function () {
      $("html").attr("dir", "ltr");
    });

    $(".direction-rtl").on("click", function () {
      $("html").attr("dir", "rtl");
    });
    // Direction end
    // ========================== Settings Panel Js End =====================

    // ********************* Toast Notification Js start *********************
    function toastMessage(messageType, messageTitle, messageText, messageIcon) {
      let $toastContainer = $("#toast-container");

      let $toast = $("<div>", {
        class: `toast-message ${messageType}`,
        html: `
      <div class="toast-message__content">
        <span class="toast-message__icon">
          <i class="${messageIcon}"></i>
        </span>
        <div class="flex-grow-1">
          <div class="d-flex align-items-start justify-content-between mb-1">
            <h6 class="toast-message__title">${messageTitle}</h6>
            <button type="button" class="toast-message__close">
              <i class="ph-bold ph-x"></i>
            </button>
          </div>
          <span class="toast-message__text">${messageText}</span>
        </div>
      </div>
      <div class="progress__bar"></div>
    `,
      });

      $toastContainer.append($toast);

      setTimeout(() => {
        $toast.addClass("active");
      }, 50);

      let totalDuration = 3500;
      let startTime = Date.now();
      let remainingTime = totalDuration;
      let toastTimeout = setTimeout(hideToast, remainingTime);

      function hideToast() {
        $toast.removeClass("active");
        setTimeout(() => {
          $toast.remove();
        }, 500);
      }

      // Remove Toast on Close Button Click
      $toast.find(".toast-message__close").on("click", function () {
        $toast.removeClass("active");
        setTimeout(() => {
          $toast.remove();
        }, 500);
      });

      // Pause Timeout on Hover
      $toast.on("mouseenter", function () {
        remainingTime -= Date.now() - startTime;
        clearTimeout(toastTimeout);
      });

      // Resume Timeout on Mouse Leave
      $toast.on("mouseleave", function () {
        startTime = Date.now();
        toastTimeout = setTimeout(hideToast, remainingTime);
      });
    }
    // ********************* Toast Notification Js End *********************

    // ========================= Form Submit Js Start ===================
    $(document).on("submit", ".form-submit", function (e) {
      e.preventDefault();

      $("input").val("");

      $("textarea").val("");

      toastMessage(
        "success",
        "Success",
        "Form submitted successfully!",
        "ph-fill ph-check-circle",
      );
    });
    // ========================= Form Submit Js End ===================

    // ================== Password Show Hide Js Start ==========
    $(".toggle-password").on("click", function () {
      $(this).toggleClass("active");
      var input = $($(this).attr("id"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
        $(this).removeClass("ph-bold ph-eye-closed");
        $(this).addClass("ph-bold ph-eye");
      } else {
        input.attr("type", "password");
        $(this).addClass("ph-bold ph-eye-closed");
      }
    });
    // ========================= Password Show Hide Js End ===========================

    // ========================= Search Popup Js Start ===================
    $(".search-popup__button").on("click", function () {
      $(".search-popup").addClass("active");
      $(".overlay").addClass("show-overlay");
    });
    $(".search-popup__close, .overlay").on("click", function () {
      $(".search-popup").removeClass("active");
      $(".overlay").removeClass("show-overlay");
    });
    // ========================= Search Popup Js End ===================

    // ========================= Sidebar Menu slide Js start ===================
    $(".sidebar-menu-slide-bar-btn").on("click", function () {
      $(".sidebar-menu-slide").toggleClass("active");
      $(".overlay").toggleClass("show-overlay show-allover");
    });
    $(".sidebar-menu-slide-close, .overlay").on("click", function () {
      $(".sidebar-menu-slide").removeClass("active");
      $(".overlay").removeClass("show-overlay show-allover");
    });
    // ========================= Sidebar Menu slide Js End ===================

    // ========================= AOS Js Start ===========================
    AOS.init({
      once: false, // animation will trigger every time the element enters the viewport
      offset: -80, // starts animation exactly when element enters viewport
      anchorPlacement: "bottom-bottom", // trigger when the bottom of the element hits the bottom of the viewport
    });
    // ========================= AOS Js End ===========================

    // // ================================= Brand slider Start =========================
    var brandSlider = new Swiper(".brand-slider", {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      autoplay: true,
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 7,
      breakpoints: {
        300: {
          slidesPerView: 2,
        },
        575: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        },
        1400: {
          slidesPerView: 7,
        },
      },
    });
    // // ================================= Brand slider End =========================

    // ================================ slider js start ==============================
    var swiper = new Swiper(".swiper-slider-three", {
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 2500,
      grabCursor: true,
      loop: true,
      navigation: {
        nextEl: "#swiper-slider-three-next",
        prevEl: "#swiper-slider-three-prev",
      },
    });
    // ================================ slider js end ==============================

    // ========================= Counter Up Js End ===================
    const counterUp = window.counterUp.default;

    const callback = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting && !el.classList.contains("is-visible")) {
          counterUp(el, {
            duration: 1500,
            delay: 16,
          });
          el.classList.add("is-visible");
        }
      });
    };
    const IO = new IntersectionObserver(callback, { threshold: 1 });

    // Banner statistics Counter
    const statisticsCounter = document.querySelectorAll(".counter");
    if (statisticsCounter.length > 0) {
      statisticsCounter.forEach((counterNumber) => {
        IO.observe(counterNumber);
      });
    }

    // performance Count
    const performanceCount = document.querySelectorAll(".counter");
    if (performanceCount.length > 0) {
      performanceCount.forEach((counterNumber) => {
        IO.observe(counterNumber);
      });
    }
    // ========================= Counter Up Js End ===================

    // ========================== Add Attribute For Bg Image Js Start ====================
    $(".background-img").css("background", function () {
      var bg = "url(" + $(this).data("background-image") + ")";
      return bg;
    });
    // ========================== Add Attribute For Bg Image Js End =====================

    // ====================== Marquee Js Start ========================
    if ($(".marquee_left").length) {
      $(".marquee_left").marquee({
        speed: 50,
        gap: 0,
        delayBeforeStart: 0,
        direction: $("html").attr("dir") === "rtl" ? "right" : "left",
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
        direction: "left",
      });
    }
    // ====================== Marquee Js End ========================

    // ========================= service Tab Js start ===================
    $(document).on("click", ".service-item", function () {
      $(".service-item").removeClass("active");
      $(this).addClass("active");
    });
    // ========================= service Tab Js End ===================

    // ========================= Active Tab Background animation Js Start ===================
    function moveBackground(wrapper) {
      var $activeTab = $(wrapper).find(".active").parent("li");
      var position = $activeTab.position();
      var width = $activeTab.width();

      $(wrapper)
        .find(".background")
        .css({
          "inset-inline-start": position.left + "px",
          width: width + "px",
        });
    }

    // Move Background on page load for each tab group
    $(".animate-background-wrapper").each(function () {
      moveBackground(this);
    });

    // Move Background on tab click
    $(".animate-background-wrapper .nav-link").on("click", function () {
      var wrapper = $(this).closest(".animate-background-wrapper");
      wrapper.find(".nav-link").removeClass("active");
      $(this).addClass("active");
      moveBackground(wrapper);
    });

    // ========================= Active Tab Background animation Js End ===================

    // ========================= Animated Radial Progress Js Start ===================
    function animateProgress() {
      $("svg.radial-progress").each(function () {
        // Check if the element is within the viewport
        const elementTop = $(this).offset().top;
        const elementBottom = elementTop + $(this).outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        if (elementBottom > viewportTop && elementTop < viewportBottom) {
          const percent = $(this).data("percentage");
          const radius = $(this).find("circle.complete").attr("r");
          const circumference = 2 * Math.PI * radius;
          const strokeDashOffset =
            circumference - (percent / 100) * circumference;

          // Animate the circle
          $(this)
            .find("circle.complete")
            .css("stroke-dashoffset", strokeDashOffset);
        }
      });
    }

    // Trigger animation on scroll and page load
    $(window).on("scroll", animateProgress);
    animateProgress(); // Run on page load
    // ========================= Animated Radial Progress Js End ===================

    // ========================= Testimonials Slider Js Start ===================
    var testimonialsSlider = new Swiper(".testimonials-slider", {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      autoplay: false,
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      navigation: {
        nextEl: ".testi-button-next",
        prevEl: ".testi-button-prev",
      },
      effect: "cube",
      grabCursor: true,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
    });
    // ========================= Testimonials Slider Js End ===================

    // ============== Magnific Popup Js Start =======================
    $(".gallery-popup").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
    // ============== Magnific Popup Js End =======================

    // ================================ Parallax js Start =================================
    $(".parallax-window").parallax();
    // ================================ Parallax js End =================================

    // ========================= magnific Popup Js Start =====================
    $(".play-button").magnificPopup({
      type: "iframe",
      removalDelay: 300,
      mainClass: "mfp-fade",
    });
    // ========================= magnific Popup Js End =====================

    // ========================= Testimonials Two Js Start =====================
    var swiper = new Swiper(".testimonials-two-slider", {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      speed: 1500,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-120%", 0, -500],
        },
        next: {
          shadow: true,
          translate: ["120%", 0, -500],
        },
      },
      pagination: {
        el: ".testimonials-two-pagination",
        clickable: true,
      },
    });
    // ========================= Testimonials Two Js End =====================
  });
  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Preloader Js Start =====================
  $(window).on("load", function () {
    $(".loader-mask").fadeOut();
  });
  // ========================= Preloader Js End=====================

  // ========================= Header Sticky Js Start ==============
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 260) {
      $(".header").addClass("fixed-header");
    } else {
      $(".header").removeClass("fixed-header");
    }
  });
  // ========================= Header Sticky Js End===================
})(jQuery);

// pdf download script

let selectedType = "";

function openPopup(type) {
  selectedType = type;
  document.getElementById("popup").style.display = "flex";

  const select = document.getElementById("datasheetSelect");

  const map = {
    IAM: "IAM Datasheet",
    CIAM: "CIAM Datasheet",
    SSO: "SSO Datasheet",
    MFA: "MFA Datasheet",
    Provisioning: "Provisioning Datasheet",
    "Access-Gateway": "Access Gateway Datasheet",
    "Adaptive-Mfa": "Adaptive MFA Datasheet",
    PAM: "PAM Datasheet",
    Bigcommerce: "BigCommerce Datasheet",
    Oracle: "Oracle SSO Datasheet",
    Windows: "Windows MFA Datasheet",
    TACACS: "TACACS Datasheet",
    Partner: "Partner Program Datasheet",
    Password: "Password Management Datasheet",
  };

  select.value = map[type] || "IAM Datasheet";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function downloadPDF(type = null) {
  const basePath = "./assets/pdf/datasheets/";

  const pdfMap = {
    IAM: basePath + "IAM-Product-datasheet.pdf",
    CIAM: basePath + "CIAM-Datasheet.pdf",
    SSO: basePath + "SSO-Product-Datasheet.pdf",
    MFA: basePath + "MFA-Product-Datasheet.pdf",
    Provisioning: basePath + "Provisioning-Product-Datasheet-1.pdf",
    "Access-Gateway": basePath + "access-gateway-datasheet.pdf",
    "Adaptive-Mfa": basePath + "Adaptive-MFA-Product-Datasheet-1.pdf",
    PAM: basePath + "PAM-Product-Datasheet.pdf",
    Bigcommerce: basePath + "BigCommerce-Product-Datasheet-1.pdf",
    Oracle: basePath + "Oracle-SSO-Product-Datasheet-1.pdf",
    Windows: basePath + "Windows-MFA-Product-Datasheet-1.pdf",
    TACACS: basePath + "TACACS-Product-Datasheet-1.pdf",
    Partner: basePath + "Partner-Program-Product-Datasheet-1.pdf",
    Password: basePath + "Password-Management-Product-Datasheet-1.pdf",
  };

  // 👉 Priority: direct click > popup selection
  const finalType = type || selectedType;

  const file = pdfMap[finalType];

  if (file) {
    const link = document.createElement("a");
    link.href = file;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    closePopup(); // optional
  } else {
    alert("File not found!");
  }
}


