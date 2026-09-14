$(function () {
  function progressBar(id,percent,color="#2659FF") {
    var bar = new ProgressBar.Line(id, {
      strokeWidth: 4,
      easing: 'easeInOut',
      duration: 1600,
      color: color,
      trailColor: 'rgba(255,255,255,0.4)',
      trailWidth: 4,
      text: {
        style: {
          color: '#ccc',
          position: 'absolute',
          right: '0',
          top: '0',     
        },
        autoStyleContainer: false
      },  
      step: (state, percent) => {
        percent.setText(Math.round(percent.value() * 100) + '%');
      }
    });    
    bar.animate(percent);
  }
  progressBar(html,0.9);
  progressBar(css,0.9);
  progressBar(js,0.85);
  progressBar(ps,0.9);
  progressBar(ai,0.9);
  progressBar(figma,0.9);

  // -----끝
})