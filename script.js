document.addEventListener('DOMContentLoaded', ()=>{
  const yes = document.getElementById('yesBtn');
  const no = document.getElementById('noBtn');
  const form = document.getElementById('valentineForm');
  const romanceScene = document.getElementById('romanceScene');
  const envelope = document.querySelector('.envelope');
  const typedText = document.getElementById('typedText');
  const music = document.getElementById('romanticMusic');

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

  function celebrate(){
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    romanceScene.classList.add('show');

    setTimeout(()=>{
      envelope.classList.add('open');
    },1500);

    setTimeout(()=>{
      typeWriter(message);
    },3000);

    music.volume = 0.6;
    music.play();
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
