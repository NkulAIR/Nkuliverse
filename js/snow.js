(function() {
  // For Reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  const canvas = document.createElement('canvas');
  canvas.id = 'snow-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const FLAKE_COUNT = 70;
  const flakes = [];

  class Snowflake {
    constructor() {
      this.reset(true);
    }

      reset(initial = false) {
      this.x = Math.random() * width;
      this.baseX = this.x;
      this.y = initial ? Math.random() * height : -10;
      this.size = Math.random() * 3 + 1; // 1–4 px
      this.speedY = Math.random() * 0.8 + 0.3;
      this.swayAmp = Math.random() * 1.5 + 0.5;
      this.swayPhase = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
      this.opacity = Math.random() * 0.6 + 0.4;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.y += this.speedY;
      this.swayPhase += this.swaySpeed;
      this.x = this.baseX + Math.sin(this.swayPhase) * this.swayAmp;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 10) this.reset();
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = 'rgba(240, 248, 255, 0.95)';
      ctx.strokeStyle = 'rgba(240, 248, 255, 0.9)';
      ctx.lineWidth = 0.8;

      if (this.size > 2) {
        for (let i = 0; i < 6; i++) {
          ctx.save();
          ctx.rotate((Math.PI / 3) * i);

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -this.size * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, -this.size);
          ctx.lineTo(this.size * 0.6, -this.size * 1.4);
          ctx.stroke();

          ctx.restore();
        }
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < FLAKE_COUNT; i++) flakes.push(new Snowflake());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const f of flakes) {
      f.update();
      f.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
})();
