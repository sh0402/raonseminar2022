
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
  autoplay: {
    delay: 3000,
  },
});
/** END / Swiper */


/** Metrix */
var matrix = (function () {
  var init = function () {
    document.body.style.background = 'black';
    var mdr = document.createElement('canvas');
    var element = document.querySelector('.matrix');

    document.body.prepend(mdr);

    var ctx = mdr.getContext('2d');

    mdr.height = element.offsetHeight;
    mdr.width = element.offsetWidth;

    //making the canvas full screen
    // mdr.height = window.innerHeight;
    // mdr.width = window.innerWidth;
    
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

    for (let i = 0; i < mdr.length; i++) {
      element.appendChild(mdr);
    }

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

/**  Interaction */
$(function () {
  var scrollBody = $('.fix_motion'); // 부모 스크롤 엘리먼트
  var scrollHeight; // 스크롤 높이
  var sectionOffsetTop; //섹션의 오프셋 탑 변수
  var sectionScrollTop; //섹션의 스크롤 탑 변수
  var scrollRealHeight; // 실제로 스크롤 해야될 높이를 담을 변수를 선언
  var winScrollTop; // 스크롤바의 높이를 담을 변수를 선언
  var scrollPercent; // 스크롤 위치 / 스크롤 길이로 구한 비율 값
  var percent; // 스크롤 백분율값을 담을 변수을 선언

  var windowWidth = $(window).width(); // 화면의 넓이 값
  var mobileSize = 1024; // 모바일로 변환된 사이즈 설정 (기명으로 모바일 버전을 체크하는게 아니라 스크린 사이즈가 1024보다 작을 경우 모바일로 간주)
  var isMobile; // 화면 사이즈가 모바일인지 체크하는 변수

  var el = document.querySelector('.canvas_wrap'); // 캔버스를 담을 변수
  var canvas = document.createElement('canvas'); // 캔버스 생성
  var ctx = canvas.getContext('2d'); // 랜더링 컨텍스트 타입을 2D로 선언
  var imgSrc = 'https://sh0402.github.io/raonseminar2022/img/hero-move/'; // 이미지 경로 설정
  var imgFormat = '.png'; // 이미지 포멧 설정
  var imgLength = 113;  // 총 이미지의 렝스

  var pcImgSize = [600, 812]; // PC일때 이미지 사이즈 [가로, 세로]
  var mobileImgSize = [300, 406]; // PC일때 이미지 사이즈 [가로, 세로]
  var imgWidth; // 이미지 넓이
  var imgHeight; // 이미지 높이
  var imgArray = []; // 이미지를 담을 배열
  var imageIterlator = 0; // 이미지가 로드 되었는지 체크하는 값


  function setProperty() { // 스크롤 할 때 변할 값을 세팅해주는 함수

    scrollHeight = scrollBody.height(); // 스크롤 높이
    sectionOffsetTop = scrollBody.offset().top; // 섹션의 오프셋 탑 변수

    scrollRealHeight = (scrollHeight - $(window).height()); // 실제로 스크롤 해야 될 높이 값을 구함
    winScrollTop = $(window).scrollTop(); // 스크롤 바의 현재 위치를 구함
    sectionScrollTop = winScrollTop - sectionOffsetTop;

    scrollPercent = sectionScrollTop / scrollRealHeight; // 스크롤 위치 / 스크롤 길이로 구한 비율 값
    percent = scrollPercent * 100; // 백분율을 구함

    windowWidth = $(window).width(); //윈도우의 넓이
    isMobile = windowWidth > mobileSize ? false : true; // PC일 경우 falsem, MOBILE일 경우 true

    imgWidth = !isMobile ? pcImgSize[0] : mobileImgSize[0]; // 이미지 넓이 설정
    imgHeight = !isMobile ? pcImgSize[1] : mobileImgSize[1]; // 이미지 높이 설정
  }

  function setCanvas() { // 캔버스 기본값 세팅
    canvas.width = imgWidth; // 캔버스 넓이
    canvas.height = imgHeight; // 캔버스 높이
  }

  function scrollFunc() { // 스크롤 할때 실행될 함수

    var sequence = Math.max(imgLength - imgLength, Math.min(Number((imgLength - imgLength - (imgLength - imgLength - imgLength * scrollPercent)).toFixed(0)), imgLength));
    //이미지 시퀸스 번호 구함

    renderCanvas(sequence);
    AOS.init();
    contentIn();
  }

  function contentIn() {
    if (percent >= 90) {
      $('.fix_motion').addClass('off');

      window.scrollTo(0, 0);

      if ($('.fix_motion').hasClass('off') === true) {
        $('.cont').removeClass('off');
        $('.cont').addClass('on');
      }
    }
    return;
  }

  function renderCanvas(sequence) { // 캔버스에 이미지 Draw
    ctx.clearRect(0, 0, imgWidth, imgHeight); // 지정한 x, y위치값과 넓이 높이 값을 넣어 캔버스를 클리어
    ctx.drawImage(imgArray[sequence], 0, 0, imgWidth, imgHeight); // 이미지 배열에 담아둔 이미지를 캔버스에 그림
  }

  function bindEvent() { // 이벤트를 추가 하는 함수
    $(window).scroll(function () { // 1.스크롤 이벤트
      setProperty();
      scrollFunc();
    });

    $(window).resize(function () { //2. 리사이즈 이벤트
      setProperty(); // 1. 이미지 크기 구함
      setCanvas(); // 2. 캔버스 크기 설정
      scrollFunc(); // 3. 이미지 Draw
    });
  }

  function init() { // 초기화 함수

    el.appendChild(canvas); // canvas_wrap 엘리먼트에 canvas를 담아줌

    for (var i = 0; i <= imgLength; i++) {
      var img = new Image(); // 이미지 객체 인스턴스 생성
      var path = imgSrc + i + imgFormat; // 이미지 패스 생성

      img.src = path; // img에 패스 대입

      img.onload = function () {
        imageIterlator += 1; // 이미지 로드 카운트의 카운트

        if (imageIterlator === imgLength) { // 이미지가 로드된 횟수와 이미지 렝스가 같아질 경우에 인터렉션 함수들을 호출함
          setProperty(); // 스크롤 할때 변할 값들을 세팅해주는 함수 
          setCanvas();  // 캔버스 기본값 세팅
          bindEvent(); // 스크롤 이벤트 바인드
          scrollFunc(); // 스크롤할때 실행될 하수
        }
      }

      imgArray.push(img); // 이미지 배열에 이미지를 담음
    }
  }

  if (Modernizr.csspositionsticky) { // 브라우저가 sticky를 지원할 경우 실행
    init(); // START
  }
});
/** END / Interaction */


/** Animation on Scroll */
AOS.init();
  /** END / Animation on Scroll */

