document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('ink-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const settings = {
        bubbleCount: 250,
        minRadius: 1,
        maxRadius: 5,
        mouseRadius: 50,
        colors: [
            { r: 78, g: 205, b: 196, a: 0.5 },
            { r: 255, g: 230, b: 109, a: 0.5 },
            { r: 123, g: 104, b: 238, a: 0.5 },
            { r: 106, g: 176, b: 76, a: 0.5 },
            { r: 240, g: 147, b: 43, a: 0.5 }
        ],
        speedFactor: 0.7,
        maxSpeed: 2,
        friction: 0.98,
        bounce: 0.8
    };

    const bubbles = [];
    const mouse = { x: null, y: null, radius: settings.mouseRadius };

    class Bubble {
        constructor() {
            this.reset();
            this.ax = 0;
            this.ay = 0;
        }

        reset() {
            this.radius = Math.random() * (settings.maxRadius - settings.minRadius) + settings.minRadius;
            this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
            this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            const colorIndex = Math.floor(Math.random() * settings.colors.length);
            this.color = settings.colors[colorIndex];
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius
            );
            gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a * 1.2})`);
            gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a * 0.6})`);
            gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
            const glowGradient = ctx.createRadialGradient(
                this.x, this.y, this.radius,
                this.x, this.y, this.radius * 2
            );
            glowGradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.2)`);
            glowGradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = glowGradient;
            ctx.fill();
        }

        update() {
            this.ax = (Math.random() - 0.5) * 0.005;
            this.ay = (Math.random() - 0.5) * 0.005;
            this.vx += this.ax;
            this.vy += this.ay;

            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > settings.maxSpeed) {
                this.vx = (this.vx / speed) * settings.maxSpeed;
                this.vy = (this.vy / speed) * settings.maxSpeed;
            }

            this.x += this.vx;
            this.y += this.vy;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius + this.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius + this.radius - distance) / (mouse.radius + this.radius);
                    this.vx += Math.cos(angle) * force * settings.speedFactor;
                    this.vy += Math.sin(angle) * force * settings.speedFactor;
                }
            }

            if (this.x - this.radius < 0) {
                this.x = this.radius;
                this.vx = Math.abs(this.vx) * settings.bounce;
            } else if (this.x + this.radius > canvas.width) {
                this.x = canvas.width - this.radius;
                this.vx = -Math.abs(this.vx) * settings.bounce;
            }

            if (this.y - this.radius < 0) {
                this.y = this.radius;
                this.vy = Math.abs(this.vy) * settings.bounce;
            } else if (this.y + this.radius > canvas.height) {
                this.y = canvas.height - this.radius;
                this.vy = -Math.abs(this.vy) * settings.bounce;
            }

            this.vx *= settings.friction;
            this.vy *= settings.friction;

            if (Math.abs(this.vx) < 0.01 && Math.abs(this.vy) < 0.01) {
                this.vx = (Math.random() - 0.5) * 0.1;
                this.vy = (Math.random() - 0.5) * 0.1;
            }
        }
    }

    for (let i = 0; i < settings.bubbleCount; i++) {
        bubbles.push(new Bubble());
    }

    window.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', function () {
        mouse.x = null;
        mouse.y = null;
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(10, 15, 30, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        bubbles.forEach(bubble => {
            bubble.update();
            bubble.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
});