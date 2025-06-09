// Função para desenhar uma folha "normal" (forma elíptica simples)
function drawLeaf(ctx, x, y, r, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Corpo da folha (elipse)
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 0.5, r, 0, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.92;
    ctx.fill();

    // Veia central
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "rgba(80,40,10,0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, r);
    ctx.lineTo(0, -r);
    ctx.stroke();

    ctx.restore();
}

const canvas = document.getElementById('fall-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let flakes = [];

function resizeCanvas() {
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

function randomLeafColor() {
    // Tons de laranja e marrom típicos do outono canadense
    const colors = [
        "#c1440e", // laranja queimado
        "#e25822", // laranja outonal
        "#b05c0b", // marrom avermelhado
        "#a0522d", // marrom médio
        "#ff9900", // laranja vibrante
        "#d2691e", // chocolate
        "#ad4f09"  // marrom escuro
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createFlakes() {
    flakes = [];
    const flakeCount = Math.max(30, Math.floor(width / 25));
    for (let i = 0; i < flakeCount; i++) {
        flakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: 12 + Math.random() * 12,
            d: 0.9 + Math.random() * 1.5,
            a: Math.random() * Math.PI * 2,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.015,
            color: randomLeafColor()
        });
    }
}
createFlakes();

function drawFlakes() {
    ctx.clearRect(0, 0, width, height);
    for (let f of flakes) {
        drawLeaf(ctx, f.x, f.y, f.r, f.rot, f.color);
    }
    moveFlakes();
}

function moveFlakes() {
    for (let f of flakes) {
        f.y += f.d;
        f.x += Math.sin(f.a) * 1.2;
        f.a += 0.012;
        f.rot += f.rotSpeed;
        if (f.y > height + 20) {
            f.y = -20;
            f.x = Math.random() * width;
            f.color = randomLeafColor();
        }
        if (f.x > width + 20) f.x = -20;
        if (f.x < -20) f.x = width + 20;
    }
}

function animateSnow() {
    drawFlakes();
    requestAnimationFrame(animateSnow);
}
animateSnow();
