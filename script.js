document.addEventListener('DOMContentLoaded', ()=>{
  const yes = document.getElementById('yesBtn');
  const no = document.getElementById('noBtn');
  const card = document.querySelector('.card');
  const confettiCanvas = document.getElementById('confetti');
  const heartsLayer = document.getElementById('hearts');
  const subtitle = document.querySelector('.subtitle');

  // Move the No button to a random place inside the card
  function moveNo() {
    const rect = card.getBoundingClientRect();
    const btnRect = no.getBoundingClientRect();
    const padding = 12;
    const maxX = rect.width - btnRect.width - padding;
    const maxY = rect.height - btnRect.height - padding;
    const x = Math.random()*maxX + padding;
    const y = Math.random()*maxY + padding + 40; // shift down to clear title
    no.style.position = 'absolute';
    no.style.left = x + 'px';
    no.style.top = y + 'px';
    no.classList.add('moved');
  }

  no.addEventListener('mouseenter', moveNo);
  no.addEventListener('click', (e)=>{ e.preventDefault(); moveNo(); });

  // Confetti
  function startConfetti(duration=4000){
    const ctx = confettiCanvas.getContext('2d');
    let W = confettiCanvas.width = window.innerWidth;
    let H = confettiCanvas.height = window.innerHeight;
    const colors = ['#ff3b6b','#ffcd5c','#fff','#ff6fa8','#ff9db6'];
    const pieces = [];
    for(let i=0;i<250;i++){
      pieces.push({x:Math.random()*W,y:Math.random()*-H,width:Math.random()*10+6,height:Math.random()*6+4, color:colors[Math.floor(Math.random()*colors.length)], rotation:Math.random()*360, speed:Math.random()*3+2, swing:Math.random()*0.04+0.01});
    }
    let start = performance.now();
    function frame(now){
      ctx.clearRect(0,0,W,H);
      for(const p of pieces){
        p.y += p.speed;
        p.x += Math.sin(now*p.swing + p.x*0.001)*2;
        p.rotation += 6;
        ctx.save();
        ctx.translate(p.x,p.y);
        ctx.rotate(p.rotation*Math.PI/180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.width/2,-p.height/2,p.width,p.height);
        ctx.restore();
        if(p.y>H+50){ p.y = -20; p.x = Math.random()*W; }
      }
      if(now - start < duration) requestAnimationFrame(frame);
      else ctx.clearRect(0,0,W,H);
    }
    requestAnimationFrame(frame);
  }

  // Floating hearts
  function spawnHearts(count=18){
    for(let i=0;i<count;i++){
      const h = document.createElement('div');
      h.className = 'floating-heart';
      h.style.left = Math.random()*100 + '%';
      h.style.top = (80 + Math.random()*20) + '%';
      heartsLayer.appendChild(h);
      const dur = 4000 + Math.random()*2000;
      h.animate([
        { transform: 'translateY(0) scale(0.7)', opacity:1 },
        { transform: 'translateY(-120vh) scale(1)', opacity:0 }
      ],{duration: dur, easing:'cubic-bezier(.2,.8,.2,1)'});
      setTimeout(()=>{ h.remove(); }, dur+100);
    }
  }

  function celebrate(){
    document.body.classList.add('celebrate');
    subtitle.textContent = "She said YES! 💖";
    yes.disabled = true; no.disabled = true;
    startConfetti(6000);
    spawnHearts(28);
    // small extra animations on yes
    yes.animate([{ transform: 'scale(1)' },{ transform:'scale(1.08)' },{ transform:'scale(1)' }],{duration:800,iterations:1});
  }

  yes.addEventListener('click', (e)=>{ e.preventDefault(); celebrate(); });

  // handle resize
  window.addEventListener('resize', ()=>{
    confettiCanvas.width = window.innerWidth; confettiCanvas.height = window.innerHeight;
  });
});
