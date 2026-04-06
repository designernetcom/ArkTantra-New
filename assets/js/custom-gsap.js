/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */

var tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger, SplitText);

// **************************** Nav Menu js Start ****************************
// let mm = gsap.matchMedia();

// mm.add("(min-width: 992px)", () => {
//   gsap.from('.nav-menu__item', {
//     opacity: 0,
//     duration: .4,
//     y: -20,
//     stagger: .12,
//   });
// });
// **************************** Nav Menu js End ****************************

// **************************** Custom Cursor Js Start ****************************
var body = document.body;
var cursor = document.querySelector(".cursor");
var dot = document.querySelector(".dot");
var cursorSmalls = document.querySelectorAll(".cursor-small");
var cursorBigs = document.querySelectorAll(".cursor-big");

body.addEventListener("mousemove", function (event) {
  gsap.to(cursor, {
    x: event.x,
    y: event.y,
    duration: 1.5,
    delay: 0.1,
    visibility: "visible",
    ease: "expo.out",
  });
});

body.addEventListener("mousemove", function (event) {
  gsap.to(dot, {
    x: event.x,
    y: event.y,
    duration: 1,
    visibility: "visible",
    ease: "expo.out",
  });
});

// Small Cursor
cursorSmalls.forEach((cursorSmall) => {
  cursorSmall.addEventListener("mouseenter", function () {
    gsap.to(dot, {
      scale: 8,
      backgroundColor: "#fff",
    });
    gsap.to(cursor, {
      visibility: "hidden",
      opacity: 0,
    });
  });

  cursorSmall.addEventListener("mouseleave", function () {
    gsap.to(dot, {
      scale: 1,
      backgroundColor: "#fff",
    });
    gsap.to(cursor, {
      visibility: "visible",
      opacity: 1,
    });
  });
});

// Big Cursor
cursorBigs.forEach((cursorBig) => {
  cursorBig.addEventListener("mouseenter", function () {
    gsap.to(dot, {
      scale: 30,
      backgroundColor: "#fff",
    });
    gsap.to(cursor, {
      visibility: "hidden",
      opacity: 0,
    });
  });

  cursorBig.addEventListener("mouseleave", function () {
    gsap.to(dot, {
      scale: 1,
      backgroundColor: "#fff",
    });
    gsap.to(cursor, {
      visibility: "visible",
      opacity: 1,
    });
  });
});
// **************************** Custom Cursor Js End ****************************

// **************************** Mobile Menu js Start ****************************
var mmm = gsap.matchMedia();
var mtl = gsap.timeline({ paused: true });

const toggleMobileMenu = document.querySelector(".toggle-mobileMenu");
const closeButton = document.querySelector(".close-button");
const mobileSideOverlay = document.querySelector(".side-overlay");

mmm.add("(max-width: 991px)", () => {
  mtl.to(".side-overlay", {
    opacity: 1,
    visibility: "visible",
    duration: 0.15,
  });

  mtl.to(".mobile-menu", {
    x: 0,
    delay: 0.2,
    duration: 0.2,
  });

  mtl.from(".nav-menu__item", {
    opacity: 0,
    duration: 0.2,
    y: -60,
    stagger: 0.08,
  });

  toggleMobileMenu.addEventListener("click", function () {
    mtl.play();
    document.body.style.overflow = "hidden";
  });

  closeButton.addEventListener("click", function () {
    mtl.reverse();
    document.body.style.overflow = "";
  });

  mobileSideOverlay.addEventListener("click", function () {
    mtl.reverse();
    document.body.style.overflow = "";
  });
});
// **************************** Mobile Menu js End ****************************

// **************************** Custom Split text Js Start ****************************
$(window).on("load", function () {
    if ($(".splitText").length) {
      gsap.registerPlugin(SplitText, ScrollTrigger);

      $(".splitText").each(function (index, el) {
        el.split = new SplitText(el, {
          type: "lines,words,chars",
          linesClass: "split-line"
        });

        // Set initial state
        gsap.set(el.split.chars, {
          yPercent: 35,
          opacity: 0
        });

        // Animate on scroll
        el.anim = gsap.to(el.split.chars, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          yPercent: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05
        });
      });
    }
  });
// **************************** Custom Split text Js End ****************************

// **************************** Position Aware button hover js start ****************************
class Button {
  constructor(buttonElement) {
    this.block = buttonElement;
    this.init();
    this.initEvents();
  }

  init() {
    const el = gsap.utils.selector(this.block);

    this.DOM = {
      button: this.block,
      flair: el(".button__flair"),
    };

    this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
    this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
  }

  getXY(e) {
    const { left, top, width, height } =
      this.DOM.button.getBoundingClientRect();

    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    return {
      x: xTransformer(e.clientX - left),
      y: yTransformer(e.clientY - top),
    };
  }

  initEvents() {
    this.DOM.button.addEventListener("mouseenter", (e) => {
      const { x, y } = this.getXY(e);

      this.xSet(x);
      this.ySet(y);

      gsap.to(this.DOM.flair, {
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      });
    });

    this.DOM.button.addEventListener("mouseleave", (e) => {
      const { x, y } = this.getXY(e);

      gsap.killTweensOf(this.DOM.flair);

      gsap.to(this.DOM.flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.9,
        ease: "power2.out",
      });
    });

    this.DOM.button.addEventListener("mousemove", (e) => {
      const { x, y } = this.getXY(e);

      gsap.to(this.DOM.flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.9,
        ease: "power2",
      });
    });
  }
}

const buttonElements = document.querySelectorAll('[data-block="button"]');

buttonElements.forEach((buttonElement) => {
  new Button(buttonElement);
});
// **************************** Position Aware button hover js End ****************************

// **************************** split Reveal js Start ****************************
if ($(".split-reveal").length) {
  let revealContainers = document.querySelectorAll(".split-reveal");

  revealContainers.forEach((container) => {
    let splitElement = container.querySelector(".split-reveal-element");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        toggleActions: "play none none none",
      },
    });

    tl.set(container, {
      autoAlpha: 1,
    });

    tl.from(container, {
      duration: 1,
      xPercent: -100,
      ease: Power2.out,
    });

    tl.from(splitElement, {
      duration: 1,
      xPercent: 100,
      scale: 1,
      delay: -1,
      ease: Power2.out,
    });
  });
}
// **************************** split Reveal js End ****************************


// **************************** Hover Parallax animation js Start ****************************
var hoverBtns = gsap.utils.toArray(".hover-parallax-wrapper");
const hoverBtnItem = gsap.utils.toArray(".hover-parallax-item");
hoverBtns.forEach((btn, i) => {
  $(btn).mousemove(function (e) {
    callParallax(e);
  });

  function callParallax(e) {
    parallaxIt(e, hoverBtnItem[i], 60);
  }

  function parallaxIt(e, target, movement) {
    var $this = $(btn);
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;

    gsap.to(target, 1, {
      x: ((relX - $this.width() / 2) / $this.width()) * movement,
      y: ((relY - $this.height() / 2) / $this.height()) * movement,
      ease: Power2.easeOut,
    });
  }
  $(btn).mouseleave(function (e) {
    gsap.to(hoverBtnItem[i], 1, {
      x: 0,
      y: 0,
      ease: Power2.easeOut,
    });
  });
});
// **************************** Hover Parallax animation js End ****************************


// ============================ On Scroll Rotate Text start ==========================
gsap.utils.toArray(".rotate-on-scroll").forEach((el, index) => {
  let tlcta = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      scrub: 1,
      start: "top 30%",
      end: "top 0%",
      toggleActions: "play none none reverse",
      markers: false,
    },
  });

  tlcta.to(el, {
    rotate: 360,
    ease: "none",
  });
});
  // ============================ On Scroll Rotate Text end ==========================


// ============================ On Scroll Rotate Text start ==========================
gsap.utils.toArray(".man-image__img").forEach((el, index) => {
  let maImageTl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      scrub: 1,
      start: "top 90%",
      end: "top -20%",
      toggleActions: "play none none reverse",
      markers: false,
    },
  });

  maImageTl.to(el, {
    scale: .8,
    ease: "none",
  });
});
  // ============================ On Scroll Rotate Text end ==========================


	// For each Item slide left
	gsap.utils.toArray(".item-slide-left").forEach((el, index) => {
		let tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 1,
				start: "top 85%",
				end: "buttom 60%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});

		tl3.set(el, { transformOrigin: "center center" }).from(
			el,
			{ x: "-=100" },
			{ x: 0, duration: 1, immediateRender: false }
		);
	});

	// For each Item slide right
	gsap.utils.toArray(".item-slide-right").forEach((el, index) => {
		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 1,
				start: "top 85%",
				end: "buttom 60%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});

		tl4.set(el, { transformOrigin: "center center" }).from(
			el,
			{ x: "+=100" },
			{ x: 0, duration: 1, immediateRender: false }
		);
	});

	// For each Item slide up
	gsap.utils.toArray(".item-slide-up").forEach((el, index) => {
		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 1,
				start: "top 85%",
				end: "buttom 60%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		});

		tl4.set(el, { transformOrigin: "center center" }).from(
			el,
			{ y: "+=100" },
			{ y: 0, duration: 1, immediateRender: false }
		);
	});

	// For each Item zoomout
	// gsap.utils.toArray(".item-zoomout").forEach((el, index) => {
	// 	let tl6 = gsap.timeline({
	// 		scrollTrigger: {
	// 			trigger: el,
	// 			scrub: 1,
	// 			start: "top 85%",
	// 			end: "buttom 50%",
	// 			toggleActions: "play none none reverse",
	// 			markers: false,
	// 		},
	// 	});

	// 	tl6.set(el, { transformOrigin: "center center" }).fromTo(
	// 		el,
	// 		{ scale: 2 },
	// 		{ scale: 1, duration: 1, immediateRender: false }
	// 	);
	// });

  
// **************************** Roadmap js start ****************************
if($('.roadmap-item').length) { 
  gsap.from(".roadmap-item", {
      y: -140,
      ease: "bounce.out", 
      duration: 1.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#roadmap-section",
        start: "top 90%",
        toggleActions: "play none none none",
      }
  });
}
// **************************** Roadmap js End ****************************
  

// **************************** Hover Image Show js Start ****************************
const imageWrapper = document.querySelector(".team-item-image-wrapper")
const imageSlider = document.querySelector(".team-item-image")

if(imageWrapper && imageSlider) {
  gsap.utils.toArray(".team-item-wrapper").forEach(el => {
    // mouse enter
    el.addEventListener("mouseenter", (e) => {
      gsap.to(imageWrapper, { duration: 0.4, opacity: 1})
    });
    el.addEventListener("mouseleave", (e) => {
      gsap.to(imageWrapper, {opacity: 0, duration: 0.4})
    });
    // get number of teams
    const projectNumber = imageSlider.children.length
    const n = 100 / projectNumber
    el.addEventListener("mousemove", (e) => {
     const indexNumber = e.srcElement.dataset.indexNumber
      
      gsap.to(imageSlider, { y: -(n * indexNumber) + "%", duration: 0.5 })
   });
  })
  
  gsap.utils.toArray(".team-item-wrapper > .team-item").forEach(el => {
    el.addEventListener("mouseenter", (e) => {
      gsap.to(el, {color: "rgba(255, 255, 255, 0.5)"})
      gsap.to(el.children[0], {x: -10})
      gsap.to(el.children[1], {x: 10})
    });
    el.addEventListener("mouseleave", (e) => {
      gsap.to(el, {color: "#fff"})
      gsap.to(el.children[0], {x: 0})
      gsap.to(el.children[1], {x: 0})
    });
  })
  
  document.addEventListener("mousemove", (e) => {
     gsap.to(imageWrapper, {left: e.clientX, top: e.clientY})
   });
}
// **************************** Hover Image Show js End ****************************







// ============================ Pricing Plan Cards animation ============================
	// gsap.utils.toArray(" .asslideupcta").forEach((el, index) => {
	// 	let tlcta = gsap.timeline({
	// 		scrollTrigger: {
	// 			trigger: el,
	// 			scrub: 1,
	// 			start: "top 90%",
	// 			end: "top 70%",
	// 			toggleActions: "play none none reverse",
	// 			markers: false,
	// 		},
	// 	});

	// 	tlcta
	// 		.set(el, { transformOrigin: "center center" })
	// 		.from(
	// 			el,
	// 			{ opacity: 1, y: "+=300" },
	// 			{ opacity: 1, y: 0, duration: 1, immediateRender: false }
	// 		);
	// });





  
	// For each images with class "animate-image" on page
	// gsap.utils.toArray(".rotatedscal").forEach((el, index) => {
	// 	let tl3 = gsap.timeline({
	// 		scrollTrigger: {
	// 			trigger: el,
	// 			scrub: 1,
	// 			start: "top 90%",
	// 			end: "buttom 60%",
	// 			toggleActions: "play none none reverse",
	// 			markers: false,
	// 		},
	// 	});

	// 	tl3.set(el, { transformOrigin: "center center" }).from(
	// 		el,
	// 		{ opacity: 1, rotateZ: 45, scale: 0.5, y: "+=100" },
	// 		{
	// 			opacity: 1,
	// 			rotateZ: 0,
	// 			scale: 1,
	// 			y: 0,
	// 			duration: 1,
	// 			immediateRender: false,
	// 		}
	// 	);
	// });





/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */
