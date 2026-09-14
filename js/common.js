$(document).ready(function(){
  // 1. pc contact 토글
  $('.contact-area .contact').click(function(){
    $('.contact-info').stop().slideToggle(300);
    $('.contact-area').toggleClass('active');
  })

  // 2. 햄버거 버튼 클릭 -> 메뉴 열기
  $(".mb-menu-btn").on("click", function() {
    $(".mobile-menu-overlay").addClass("active");
    $("body").css("overflow", "hidden");
  });

  // 3. 닫기(X) 버튼 클릭 -> 메뉴 닫기
  $(".mb-close-btn").on("click", function() {
    $(".mobile-menu-overlay").removeClass("active");
    $("body").css("overflow", "auto");
  });

  // 4. 모바일 메뉴 안의 하단 Contact 토글
  $(".mobile-menu-contact").on("click", function() {
    $(this).prev(".mobile-menu-contact-info").stop().slideToggle(300);
    $(this).toggleClass("active");
  });

  //---끝
});