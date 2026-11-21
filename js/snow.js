// snow.js  (fire embers version)
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'fire-canvas';
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  function resize() {
    width  = canvas.width  = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const SPRITE_SIZE = 64;
  function makeSprite(hue) {
    const s = document.createElement('canvas');
    s.width = s.height = SPRITE_SIZE;
    const c = s.getContext('2d');
    const g = c.createRadialGradient(
      SPRITE_SIZE / 2, SPRITE_SIZE / 2, 0,
      SPRITE_SIZE / 2, SPRITE_SIZE / 2, SPRITE_SIZE / 2
    );
    g.addColorStop(0,    'rgba(255, 255, 220, 1)');
    g.addColorStop(0.25, `hsla(${hue + 15}, 100%, 70%, 0.9)`);
    g.addColorStop(0.55, `hsla(${hue}, 100%, 50%, 0.5)`);
    g.addColorStop(1,    `hsla(${hue}, 100%, 40%, 0)`);
    c.fillStyle = g;
    c.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    return s;
  }
  const sprites = [makeSprite(15), makeSprite(30), makeSprite(45)];

  const EMBER_COUNT = 60;
  const embers = [];

  class Ember {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x           = Math.random() * width;
      this.baseX       = this.x;
      this.y           = initial ? Math.random() * height : height + 10;
      this.size        = Math.random() * 2 + 1;          // core radius (px)
      this.speedY      = Math.random() * 1.2 + 0.4;      // rise speed
      this.swayAmp     = Math.random() * 2 + 0.5;        // horizontal wander
      this.swayPhase   = Math.random() * Math.PI * 2;
      this.swaySpeed   = Math.random() * 0.03 + 0.01;
      this.life        = 0;
      this.maxLife     = (Math.random() * 6 + 4) * 60;   // frames
      this.flickerPhase= Math.random() * Math.PI * 2;
      this.sprite      = sprites[(Math.random() * sprites.length) | 0];
    }

    update() {
      this.y -= this.speedY;
      this.swayPhase += this.swaySpeed;
      this.x = this.baseX + Math.sin(this.swayPhase) * this.swayAmp;
      this.life++;
      this.flickerPhase += 0.15;

      if (this.y < -30 || this.life > this.maxLife) this.reset();
    }

    draw() {
      const flicker = 0.65 + 0.35 * Math.sin(this.flickerPhase);
      const fadeIn  = Math.min(1, this.life / 30);
      const fadeOut = Math.min(1, (this.maxLife - this.life) / 60);
      ctx.globalAlpha = flicker * fadeIn * fadeOut;

      const drawSize = this.size * (4 + flicker * 2);
      ctx.drawImage(
        this.sprite,
        this.x - drawSize / 2,
        this.y - drawSize / 2,
        drawSize,
        drawSize
      );
    }
  }

  for (let i = 0; i < EMBER_COUNT; i++) embers.push(new Ember());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter'; // additive glow
    for (const e of embers) { e.update(); e.draw(); }
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
})();
