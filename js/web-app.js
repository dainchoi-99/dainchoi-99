$(function () {

  // 1. MixItUp (필터 및 중복 클릭 방지)
  
  let isBusy = false;

  // (2) MixItUp 설정
  var mixer = mixitup('.works-list', {
    selectors: {
      control: '.filter-btn'
    },
    animation: {
      enable: false,
    },
    callbacks: {
      onMixStart: function(state, futureState) {
        isBusy = true;
      },
      onMixEnd: function(state) {
        isBusy = false;
      }
    }
  });

  // (3) 탭 버튼 클릭 이벤트 (커스텀 제어)
  $('.filter-btn').on('click', function() {
    
    if (isBusy) return;

    // 믹싱 요청
    var selector = $(this).attr('data-filter');
    
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
  });

  // 2. PROCESS 모달 기능
  
  // (1) 프로젝트 데이터 정의
  const webProjectData = {
    "교보문고": {
      subTitle: "리디자인",
      title: "교보문고",
      image: "images/web-work-process-01.jpg"
    },
    "화담숲": {
      subTitle: "리디자인",
      title: "화담숲",
      image: ""
    },
    "RE:PAY": {
      subTitle: "팀 프로젝트",
      title: "RE:PAY",
      image: "images/web-work-process-03.jpg"
    },
    "화담숲 앱": {
      subTitle: "개인 프로젝트, 노코드",
      title: "화담숲 앱",
      image: "images/web-work-process-04.jpg"
    },
  };

  // (2) PROCESS 버튼 클릭 시 모달 열기
  $(document).on('click', '.btn-process', function(e) {
    e.preventDefault();

    const id = $(this).attr('data-id');
    const data = webProjectData[id];

    if (!data || data.image === "") {
      alert("준비 중입니다.");
      return;
    }

    // 모달 HTML 생성
    const modalHtml = `
      <div class="web-modal-wrap">
        <div class="modal-title">
          <span class="label-badge">WEB/APP WORKS</span>
          <div class="title-area">
            <p class="sub-title">${data.subTitle}</p>
            <h3 class="main-title">${data.title}</h3>
          </div>
        </div>

        <div class="modal-image">
          <img src="${data.image}" alt="Process Image">
        </div>
      </div>

      <button type="button" class="btn-close-web">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <button type="button" class="btn-go-top">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    `;

    $('#webModal').html(modalHtml);
    $('#webModal').fadeIn(300).css('display', 'flex');
    $('body').css('overflow', 'hidden');

    $('.web-modal-wrap').on('scroll', function() {
      if ($(this).scrollTop() > 300) {
        $('.btn-go-top').fadeIn();
      } else {
        $('.btn-go-top').fadeOut();
      }
    });

    $('.btn-go-top').on('click', function() {
      $('.web-modal-wrap').animate({ scrollTop: 0 }, 400);
    });

  });

  //  (4) [추가] 디자인 시안 미리보기 (코딩 미완성 대체용)
  $(document).on('click', '.btn-design-view', function(e) {
    e.preventDefault(); // 링크 이동 막기

    const imgSrc = $(this).attr('data-img'); // HTML에 적은 이미지 경로 가져오기

    // 이미지 경로가 비어있으면 경고
    if (!imgSrc) {
      alert("이미지가 준비되지 않았습니다.");
      return;
    }

    // 모달 HTML 생성 (타이틀 없이 이미지만 크게 보여줌)
    const modalHtml = `
      <div class="web-modal-wrap">
        <div class="modal-title" style="text-align: center;">
          <span class="label-badge" style="margin-bottom: 0;">DESIGN PREVIEW</span>
        </div>

        <div class="modal-image" style="margin-top: 30px;">
          <img src="${imgSrc}" alt="Design Preview">
        </div>
      </div>

      <button type="button" class="btn-close-web">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <button type="button" class="btn-go-top">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    `;

    // 모달 띄우기 (기존 로직 동일)
    $('#webModal').html(modalHtml);
    $('#webModal').fadeIn(300).css('display', 'flex');
    $('body').css('overflow', 'hidden');

    // 스크롤 및 Go Top 기능 연결
    $('.web-modal-wrap').on('scroll', function() {
      if ($(this).scrollTop() > 300) {
        $('.btn-go-top').fadeIn();
      } else {
        $('.btn-go-top').fadeOut();
      }
    });

    $('.btn-go-top').on('click', function() {
      $('.web-modal-wrap').animate({ scrollTop: 0 }, 400);
    });
  });
  
  // (3) 모달 닫기 버튼
  $(document).on('click', '.btn-close-web', function() {
    $('#webModal').fadeOut(300, function() {
      $(this).empty();
    });
    $('body').css('overflow', 'auto');
  });

});