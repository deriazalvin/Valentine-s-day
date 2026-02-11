document.addEventListener('DOMContentLoaded', ()=>{
  const yes = document.getElementById('yesBtn');
  const no = document.getElementById('noBtn');
  const form = document.getElementById('valentineForm');
  const romanceScene = document.getElementById('romanceScene');
  const envelope = document.querySelector('.envelope');
  const typedText = document.getElementById('typedText');
  const music = document.getElementById('romanticMusic');
  const petalsLayer = document.getElementById('petals');
  const backBtn = document.getElementById('backBtn');

  const message = `💌 My Everlight 💌

There are not enough words in this world to describe how much you mean to me. When I look at you, I see my future. When I hold you, I feel complete. ✨

You are the fire in my soul 🔥, the beat in my heart ❤️, and the reason I believe in true love. Every day with you feels like a dream I never want to wake up from.

On this special day, I want you to remember that my love for you grows stronger every second 💞. No matter what happens, I will always choose you.

Happy Valentine’s Day to the love of my life. 💘

With all my passion,
Alvin 💖`;

  function typeWriter(text, i = 0){
    if(i < text.length){
      typedText.innerHTML += text.charAt(i);
      setTimeout(()=> typeWriter(text, i+1), 30);
    }
  }

  function launchPetals(count = 25){
    for(let i=0;i<count;i++){
      const petal = document.createElement('div');
      petal.className='petal';
      petal.style.left = Math.random()*100 + '%';
      petal.style.animation = `fallPetal ${4+Math.random()*3}s linear forwards`;
      petal.style.animationDelay = Math.random()*2+'s';
      petalsLayer.appendChild(petal);
      setTimeout(()=>{ petal.remove(); }, 7000);
    }
  }

  function launchSparkles(count = 20){
    for(let i=0;i<count;i++){
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random()*100 + '%';
      sparkle.style.top = Math.random()*80 + '%';
      sparkle.style.animationDelay = Math.random()*1.5 + 's';
      document.body.appendChild(sparkle);
      setTimeout(()=> sparkle.remove(), 2000);
    }
  }

  function celebrate(){
    // Formspree
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    // Show envelope scene
    romanceScene.classList.add('show');

    // Play music
    music.volume = 0.6;
    music.play().catch(err=>console.log("Autoplay blocked"));

    // Launch petals
    launchPetals(30);

    // Sparkles
    const sparkleInterval = setInterval(()=> launchSparkles(5), 600);

    // Open envelope
    setTimeout(()=> envelope.classList.add('open'), 1500);

    // Type letter
    setTimeout(()=> typeWriter(message), 3000);

    // Activate back button after typing finished
    setTimeout(()=>{
      backBtn.style.display = 'block';
    }, 3000 + message.length*30 + 500); // un peu après le typing
  }

  yes.addEventListener('click',(e)=>{
    e.preventDefault();
    celebrate();
  });

  no.addEventListener('mouseover',()=>{
    no.style.position="absolute";
    no.style.top=Math.random()*200+"px";
    no.style.left=Math.random()*200+"px";
  });

  // Retour au menu initial
  backBtn.addEventListener('click', ()=>{
    romanceScene.classList.remove('show');
    envelope.classList.remove('open');
    typedText.innerHTML='';
    backBtn.style.display='none';
    music.pause();
    music.currentTime=0;
  });

  // Confetti interactif sur click
  const confettiCanvas = document.getElementById('confetti');
  const heartsLayer = document.getElementById('hearts');

  confettiCanvas.addEventListener('click',()=>{
    // On relance confetti
    startConfetti(3000);
    spawnHearts(15);
  });

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
        if(p.y>H+50){ p.y=-20; p.x=Math.random()*W; }
      }
      if(now-start < duration) requestAnimationFrame(frame);
      else ctx.clearRect(0,0,W,H);
    }
    requestAnimationFrame(frame);
  }

  function spawnHearts(count=18){
    for(let i=0;i<count;i++){
      const h = document.createElement('div');
      h.className='floating-heart';
      h.style.left = Math.random()*100 + '%';
      h.style.top = (80+Math.random()*20) + '%';
      heartsLayer.appendChild(h);
      const dur = 4000 + Math.random()*2000;
      h.animate([{ transform: 'translateY(0) scale(0.7)', opacity:1 },
                 { transform: 'translateY(-120vh) scale(1)', opacity:0 }],
                 {duration: dur, easing:'cubic-bezier(.2,.8,.2,1)'});
      setTimeout(()=>{ h.remove(); }, dur+100);
    }
  }

  window.addEventListener('resize', ()=>{
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  });
});
