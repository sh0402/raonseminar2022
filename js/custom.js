
/** Swiper */
const swiper = new Swiper('.swiper', {
  autoplay: false,
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // 화면의 넓이가 320px 이상일 때
    320: {
      slidesPerView: 1,
      spaceBetween: 32,
    },
    // 화면의 넓이가 640px 이상일 때
    640: {
      slidesPerView: 1,
      spaceBetween: 32,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 96,
    },

    1280: {
      slidesPerView: 3,
      spaceBetween: 80,
    },
  },
});

/** END / Swiper */


/** Metrix */
var matrix = (function () {
  var init = function () {
    document.body.style.background = 'black';
    var mdr = document.createElement('canvas');
    var el2 = document.querySelector('#main');
    
    document.body.prepend(mdr);

    var ctx = mdr.getContext('2d');
    var mainBg = document.getElementById('main');

    mdr.height = mainBg.offsetHeight;
    mdr.width = mainBg.offsetWidth;

    //making the canvas full screen
    // mdr.height = window.innerHeight;
    // mdr.width = window.innerWidth;
    el2.appendChild(mdr);
    //code characters - taken from the unicode charset
    var code = '0 1 0 1 1 0 1 0 0 1 1 0 1 0 1 0 0';
    //converting the string into an array of single characters
    code = code.split('');

    var font_size = 24;
    var columns = mdr.width / font_size; //number of columns for the rain
    //an array of drops - one per column
    var drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (var x = 0; x < columns; x++) {
      drops[x] = 400;
    }

    window.addEventListener('resize', function () {
      window.requestAnimationFrame(function () {
        mdr.height = window.innerHeight;
        mdr.width = window.innerWidth;
        columns = mdr.width / font_size;
        for (var x = 0; x < columns; x++) {
          drops[x] = 400;
        }
      });
    });

    //drawing the characters
    var draw = function () {
      //Black BG for the canvas
      //translucent BG to show trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, mdr.width, mdr.height);

      ctx.fillStyle = '#00fff23e'; //text color
      ctx.font = font_size + 'px arial';
      //looping over drops
      for (var i = 0; i < drops.length; i++) {
        
        //a random code character to print
        var text = code[Math.floor(Math.random() * code.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > mdr.height && Math.random() > 0.975) {
          //if(Math.random() > 0.975) {
          drops[i] = 0;
        }

        //incrementing Y coordinate
        drops[i]++;
      }
    };

    setInterval(function () {
      window.requestAnimationFrame(draw);
    }, 60);
  };

  return {
    init: init,
  };
})();

// init on dom ready
(function (fn) {
  var d = document;
  d.readyState == 'loading'
    ? d.addEventListener('DOMContentLoaded', fn)
    : fn();
})(function () {
  matrix.init();
});

/** END / Metrix */


/** Animation on Scroll */
AOS.init();
  /** END / Animation on Scroll */

