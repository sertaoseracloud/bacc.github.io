// Efeito de neve sobre a cidade
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('city-snow-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    function resize() {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    }
    resize();
    window.addEventListener('resize', resize);

    const snowflakes = [];
    function getCount() {
        return Math.max(30, Math.floor(width / 10));
    }
    function createSnowflake() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            speed: Math.random() * 1 + 0.5,
            wind: Math.random() * 0.6 - 0.3
        };
    }
    function fillSnowflakes() {
        const target = getCount();
        while (snowflakes.length < target) snowflakes.push(createSnowflake());
        while (snowflakes.length > target) snowflakes.pop();
    }
    fillSnowflakes();
    window.addEventListener('resize', fillSnowflakes);

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = "#fff";
        for (let flake of snowflakes) {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
    function update() {
        for (let flake of snowflakes) {
            flake.y += flake.speed;
            flake.x += flake.wind;
            if (flake.y > height) {
                flake.y = -flake.radius;
                flake.x = Math.random() * width;
            }
            if (flake.x < 0) flake.x = width;
            if (flake.x > width) flake.x = 0;
        }
    }
    function animate() {
        draw();
        update();
        requestAnimationFrame(animate);
    }
    animate();
});