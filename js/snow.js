function drawSnowflake(ctx, x, y, r, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 6) * i);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r);
        for (let j = 1; j < 3; j++) {
            let branchLen = r * (0.3 + 0.15 * j);
            let branchY = -r * (j / 3);
            ctx.moveTo(0, branchY);
            ctx.lineTo(branchLen, branchY - branchLen * 0.3);
            ctx.moveTo(0, branchY);
            ctx.lineTo(-branchLen, branchY - branchLen * 0.3);
        }
        ctx.stroke();
        ctx.restore();
    }
    ctx.restore();
}

const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let flakes = [];

function resizeCanvas() {
    // Faz o canvas preencher a tela inteira
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', () => {
    resizeCanvas();
    createFlakes();
});
resizeCanvas();

function createFlakes() {
    flakes = [];
    // Número de flocos proporcional à largura da tela
    const flakeCount = Math.max(30, Math.floor(width / 25));
    for (let i = 0; i < flakeCount; i++) {
        flakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: 7 + Math.random() * 7,
            d: 0.7 + Math.random() * 1.2,
            a: Math.random() * Math.PI * 2,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.01
        });
    }
}
createFlakes();

function drawFlakes() {
    ctx.clearRect(0, 0, width, height);
    for (let f of flakes) {
        drawSnowflake(ctx, f.x, f.y, f.r, f.rot);
    }
    moveFlakes();
}

function moveFlakes() {
    for (let f of flakes) {
        f.y += f.d;
        f.x += Math.sin(f.a) * 0.6;
        f.a += 0.008;
        f.rot += f.rotSpeed;
        if (f.y > height + 10) {
            f.y = -10;
            f.x = Math.random() * width;
        }
        if (f.x > width + 10) f.x = -10;
        if (f.x < -10) f.x = width + 10;
    }
}

function animateSnow() {
    drawFlakes();
    requestAnimationFrame(animateSnow);
}
animateSnow();
