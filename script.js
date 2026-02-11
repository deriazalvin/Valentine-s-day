document.addEventListener('DOMContentLoaded', ()=>{
  const yes = document.getElementById('yesBtn');
  const no = document.getElementById('noBtn');
  const form = document.getElementById('valentineForm');
  const romanceScene = document.getElementById('romanceScene');
  const envelope = document.querySelector('.envelope');
  const typedText = document.getElementById('typedText');
  const music = document.getElementById('romanticMusic');
  const petalsLayer = document.getElementById('petals');

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
    // Send form to Formspree
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    // Show envelope scene
    romanceScene.classList.add('show');

    // Play music
    music.volume = 0.6;
    music.play().catch(err => console.log("Autoplay blocked", err));

    // Launch petals
    launchPetals(30);

    // Small sparkles around
    setInterval(()=> launchSparkles(5), 600);

    // Open envelope
    setTimeout(()=> envelope.classList.add('open'), 1500);

    // Type letter
    setTimeout(()=> typeWriter(message), 3000);
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
});
