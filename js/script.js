$(document).ready(function (){
  
  // 1. 타이핑 애니메이션
  var typed = new Typed('#animated', {
    stringsElement: '#typed',
    typeSpeed: 50,
    showCursor: false,
  });

  // 2. Web/App Works 메인 슬라이드
  var webAppSwiper = new Swiper(".webAppSwiper", {
    effect: "cards",
    cardsEffect: {
      perSlideOffset: 4.5,
      perSlideRotate: 4.5,
    },
    grabCursor: true,
  });

  // 3. Matter.js 실행
  initPhysics();

  // 4. 모바일 하단 Contact 토글
  $(".mobile-contact-btn").on("click", function() {
    $(".mobile-contact-info").stop().slideToggle(300);
    $(this).toggleClass("active");
  });

  // 5. 햄버거 메뉴 열기
  $(".mb-menu-btn").on("click", function() {
    $(".mobile-menu-overlay").addClass("active");
    $("body").css("overflow", "hidden");
    
    $(".mobile-contact-info").slideUp(300);
    $(".mobile-contact-btn").removeClass("active");
  });

  // 6. 닫기(X) 버튼 클릭 -> 메뉴 닫기
  $(".mb-close-btn").on("click", function() {
    $(".mobile-menu-overlay").removeClass("active");
    $("body").css("overflow", "auto");
  });

  // 7. 모바일 메뉴 안의 Contact 토글 기능
  $(".mobile-menu-contact").on("click", function() {
    $(this).prev(".mobile-menu-contact-info").stop().slideToggle(300);
    $(this).toggleClass("active");
  });

  // 8. 모바일 Swiper
  var swiper = new Swiper(".mobile-interest-swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
  });

  // 9. module 떨어지는 애니메이션 효과
  if (window.innerWidth <= 768) {
    
    var targets = gsap.utils.toArray([
        ".module .tech",
        ".mobile-interest-swiper",
        ".module .about",
        ".module .web-app-works",
        ".module .design-works",
    ]);

    gsap.fromTo(targets, 
      { 
        y: -100,
        opacity: 0,
        visibility: "hidden" 
      },
      { 
        y: 0,
        opacity: 1,
        visibility: "visible",
        
        duration: 2,
        ease: "elastic.out(1, 0.5)",
        stagger: {
            each: 0.2,
            from: "end",
        },
        delay: 0.3,
      },
    );
  }
  //-----끝
  
});

function initPhysics() {
    const container = document.getElementById('physics-area');
    if (!container) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Composite = Matter.Composite;

    const engine = Engine.create();
    const world = engine.world;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // (모바일에서 크기가 0이면 실행 중단하여 오류 방지)
    if (width === 0 || height === 0) return;

    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: width,
            height: height,
            background: 'transparent',
            wireframes: false
        }
    });

    const wallOptions = { isStatic: true, render: { visible: false } };
    const offset = 30;

    let ground = Bodies.rectangle(width / 2, height + offset, width, 60, wallOptions);
    let leftWall = Bodies.rectangle(0 - offset, height / 2, 60, height, wallOptions);
    let rightWall = Bodies.rectangle(width + offset, height / 2, 60, height, wallOptions);

    World.add(world, [ground, leftWall, rightWall]);

    const iconImages = [
        'images/home-icon01.png',
        'images/home-icon02.png',
        'images/home-icon03.png',
        'images/home-icon04.png',
        'images/home-icon05.png',
        'images/home-icon06.png'
    ];

    const icons = [];
    iconImages.forEach((imgSrc, index) => {
        const xPos = Math.random() * (width - 100) + 50; 
        const yPos = -100 - (index * 50); 

        const icon = Bodies.circle(xPos, yPos, 30, {
            restitution: 0.6,
            friction: 0.1,
            render: {
                sprite: {
                    texture: imgSrc,
                    xScale: 0.25,
                    yScale: 0.25
                }
            }
        });
        icons.push(icon);
    });

    World.add(world, icons);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;

        if (newWidth === 0 || newHeight === 0) return;

        render.canvas.width = newWidth;
        render.canvas.height = newHeight;
        
        World.remove(world, [ground, leftWall, rightWall]);

        ground = Bodies.rectangle(newWidth / 2, newHeight + offset, newWidth, 60, wallOptions);
        leftWall = Bodies.rectangle(0 - offset, newHeight / 2, 60, newHeight, wallOptions);
        rightWall = Bodies.rectangle(newWidth + offset, newHeight / 2, 60, newHeight, wallOptions);

        World.add(world, [ground, leftWall, rightWall]);

        icons.forEach(icon => {
            if (icon.position.x > newWidth) {
                Matter.Body.setPosition(icon, { x: newWidth - 30, y: icon.position.y });
                Matter.Body.setVelocity(icon, { x: 0, y: 0 });
            }
            if (icon.position.x < 0) {
                Matter.Body.setPosition(icon, { x: 30, y: icon.position.y });
                Matter.Body.setVelocity(icon, { x: 0, y: 0 });
            }
            if (icon.position.y > newHeight) {
                Matter.Body.setPosition(icon, { x: icon.position.x, y: newHeight - 30 });
                Matter.Body.setVelocity(icon, { x: 0, y: 0 });
            }
            if (icon.position.y < -150) { 
                Matter.Body.setPosition(icon, { x: icon.position.x, y: 50 });
            }
        });
    });
}