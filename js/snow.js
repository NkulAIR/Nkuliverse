// js/snow.js  (falling fire version)
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'fire-canvas';
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  function resize() {
    width  = canvas.width  = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ---- Cached glow sprite ---- */
  const SPRITE_SIZE = 64;
  function makeSprite(hue) {
    const s = document.createElement('canvas');
    s.width = s.height = SPRITE_SIZE;
    const c = s.getContext('2d');
    const g = c.createRadialGradient(
      SPRITE_SIZE/2, SPRITE_SIZE/2, 0,
      SPRITE_SIZE/2, SPRITE_SIZE/2, SPRITE_SIZE/2
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

  /* ---- Falling fire flakes ---- */
  const COUNT = 60;
  const flakes = [];

  class FireFlake {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x            = Math.random() * width;
      this.baseX        = this.x;
      this.y            = initial ? Math.random() * height : -20;
      this.size         = Math.random() * 2 + 1;           // core radius
      this.speedY       = Math.random() * 1.2 + 0.5;       // fall speed
      this.speedX       = Math.random() * 0.8 - 0.4;       // steady drift (like leaves)
      this.swayAmp      = Math.random() * 1.5 + 0.5;       // sine sway
      this.swayPhase    = Math.random() * Math.PI * 2;
      this.swaySpeed    = Math.random() * 0.03 + 0.01;
      this.flickerPhase = Math.random() * Math.PI * 2;
      this.sprite       = sprites[(Math.random() * sprites.length) | 0];
    }

    update() {
      this.y        += this.speedY;                        // fall DOWN
      this.baseX    += this.speedX;                        // horizontal drift
      this.swayPhase += this.swaySpeed;
      this.x         = this.baseX + Math.sin(this.swayPhase) * this.swayAmp;
      this.flickerPhase += 0.15;

      // Respawn at top when it exits the bottom or drifts off the sides
      if (this.y > height + 20 || this.baseX < -50 || this.baseX > width + 50) {
        this.reset();
      }
    }

    draw() {
      const flicker  = 0.65 + 0.35 * Math.sin(this.flickerPhase);
      // Fade in at the top, fade out near the bottom (sparks "cooling")
      const fadeIn   = Math.min(1, this.y / 80);
      const fadeOut  = Math.min(1, (height - this.y) / 200);
      ctx.globalAlpha = flicker * fadeIn * fadeOut;

      const drawSize = this.size * (4 + flicker * 2);
      ctx.drawImage(
        this.sprite,
        this.x - drawSize/2,
        this.y - drawSize/2,
        drawSize,
        drawSize
      );
    }
  }

  for (let i = 0; i < COUNT; i++) flakes.push(new FireFlake());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';
    for (const f of flakes) { f.update(); f.draw(); }
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
})();
