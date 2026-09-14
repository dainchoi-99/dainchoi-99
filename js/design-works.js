$(document).ready(function() {

  // 1. 데이터 정의
  const projectData = {
    "1": {
      subTitle: "로고디자인",
      title: "별아래 포도",
      desc: "브랜드의 핵심 가치를 담아낸 로고 디자인 프로젝트입니다.<br>심플하면서도 기억에 남는 심볼을 제작하고자 했습니다.",
      tools: ["Illustrator"],
      date: "3일",
      colors: ["#0f0f59", "#d0a926"],
      image: "images/design-work-01.jpg"
    },
    "2": {
      subTitle: "상세페이지",
      title: "루메나 SPACE S 무드등",
      desc: "한샘의 기존 상세페이지는 정보 구조가 명확하지 않고<br> 과도한 이미지 사용으로 흐름이 끊기는 문제가 있었습니다.<br> 이에 핵심 정보를 재구성해 흐름을 정리하고<br> 제품의 무드에 맞는 컬러와 폰트를 사용해 제작했습니다.",
      tools: ["Photoshop"],
      date: "4일",
      colors: ["#e7ddd0", "#9d896c", "#31210d"],
      image: "images/design-work-02.jpg"
    },
    "3": {
      subTitle: "북커버 디자인",
      title: "고양이처럼 살아보기",
      desc: "2022년의 초기 시안의 지나치게 아기자기한 요소를 덜어내고<br> 내지 그래픽과 어울리는 감각적인 무드로 재해석했습니다.",
      tools: ["Photoshop"],
      date: "1일",
      colors: ["#fff","#fdf8ed", "#000"],
      image: "images/design-work-03.jpg"
    },
    "4": {
      subTitle: "포스터&middot;현수막 디자인",
      title: "전공융합 경진대회",
      desc: "2024년 직접 제작했던 포스터를 기반으로 실무 경험을 통해 인지한 한계를 보완하고자 2026년 시점에서 리터치한 작업입니다.<br>정보의 위계가 자연스럽게 읽히도록 타이포그래피와 레이아웃을 재구성하고 다양한 출력 환경에 대응할 수 있도록 현수막 가로·세로 버전으로 확장했습니다.",
      tools: ["Illustrator, Photoshop"],
      date: "2일",
      colors: ["#bad546","#cae8fa", "#3691d0", "#000", "#67856f", "#5f425b"],
      image: "images/design-work-04.jpg"
    },
    "5": {
      subTitle: "패키지 디자인",
      title: "요거트 오브맘",
      desc: "오브맘이 추구하는 ‘매일 먹는 요거트 식사’의 이미지를 담아 친근하면서도 깔끔한 패키지를 디자인했습니다. 기존 제품과 자연스럽게 어울리도록 세리프 서체와 레드 컬러를 사용해 브랜드의 통일감을 유지했습니다.<br>부드럽고 크리미한 요거트 이미지를 강조해 제품의 특징이 잘 드러나도록 했으며, 소프트 블루 컬러를 활용해 신선하고 깨끗한 느낌을 표현했습니다. 또한 가운데 띠를 기준으로 요거트와 과일 이미지를 나누어 배치해, 새로운 맛이 추가되더라도 과일 이미지와 컬러만 바꾸어 쉽게 확장할 수 있도록 구성했습니다.",
      tools: ["Illustrator, Photoshop"],
      date: "5일",
      colors: ["#E72E2A","#E2F0F6", "#2E3F5C"],
      image: "images/design-work-05.jpg"
    },
    "6": {
      subTitle: "북디자인",
      title: "7 SERIES",
      desc: "일상에서 직접 촬영한 사진을 색상별로 분류해 7권의 포토북으로 제작했습니다.<br>각 권의 색과 이미지에 어울리는 제목과 서체를 선정하고, 색감 보정과 편집 디자인을 거쳐 직접 제본했습니다.",
      tools: ["Photoshop", "InDesign"],
      date: "1주일",
      colors: ["#ed1226", "#ff701b", "#ffe900", "#00a957", "#344a96", "#d84e70", "#ffffff"],
      image: "images/design-work-06.png"
    },

  };

  // 2. 카드 클릭 시 모달 생성 및 열기
  $('.card').click(function() {
    const id = $(this).attr('data-id');
    const data = projectData[id];
    
    if (!data) return;

    // 맵핑 (도구, 컬러)
    const toolsHtml = data.tools.map(tool => `<span>${tool}</span>`).join('');
    const colorsHtml = data.colors.map(color => `<span class="swatch" style="background-color: ${color};"></span>`).join('');

    const modalHtml = `
      <div class="design-modal-wrap">
        <div class="modal-left">
          <span class="label-badge">DESIGN WORKS</span>
          
          <div class="title-area">
            <p class="sub-title">${data.subTitle}</p>
            <h3 class="main-title">${data.title}</h3>
            <p class="desc">${data.desc}</p>
          </div>

          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">사용툴</span>
              <div class="info-content">${toolsHtml}</div>
            </div>
            <div class="info-item">
              <span class="info-label">작업기간</span>
              <div class="info-content"><span>${data.date}</span></div>
            </div>
            <div class="info-item">
              <span class="info-label">COLOR</span>
              <div class="color-swatch">${colorsHtml}</div>
            </div>
          </div>
        </div>

        <div class="modal-right">
          <img src="${data.image}" alt="Detail Image">
        </div>
      </div>

      <button type="button" class="btn-close-design">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <button type="button" class="btn-go-top">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    `;

    $('#designModal').append(modalHtml);
    $('#designModal').fadeIn(300).css('display', 'flex');
    $('body').css('overflow', 'hidden');

    $('.modal-right').on('scroll', function() {
      if ($(this).scrollTop() > 300) {
        $('.btn-go-top').fadeIn();
      } else {
        $('.btn-go-top').fadeOut();
      }
    });

    $('.btn-go-top').on('click', function() {
      $('.modal-right').animate({ scrollTop: 0 }, 400);
    });

  });


  // 3. 모달 닫기
  $(document).on('click', '.btn-close-design', function() {
      $('#designModal').fadeOut(300, function() {
        $(this).empty(); 
      });
      $('body').css('overflow', 'auto');
  });

});