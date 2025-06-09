// Efeito de folhas caindo sobre montanhas (outono, de dia) - ocupa toda a section
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('fallcity-canvas');
    const section = canvas && canvas.parentElement;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = section.offsetWidth;
        height = section.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
    }
    resize();
    window.addEventListener('resize', resize);

    // Paleta de cores de folhas de outono
    const leafColors = ['#c1440e', '#e25822', '#f4a259', '#b5832d', '#7b3f00', '#eab676'];
    const leafShapes = [
        // formato oval simples
        function (ctx, x, y, r, rot) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rot);
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 1.2, r * 0.6, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        },
        // formato folha pontuda
        function (ctx, x, y, r, rot) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rot);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(r, -r, 0, -r * 1.5);
            ctx.quadraticCurveTo(-r, -r, 0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    ];

    // Dados das árvores de outono (posição e escala relativas)
    const autumnTrees = [
        { x: 0.12, y: 0.82, scale: 1.1, color: '#e25822' },
        { x: 0.18, y: 0.87, scale: 0.8, color: '#b5832d' },
        { x: 0.32, y: 0.89, scale: 1.2, color: '#f4a259' },
        { x: 0.48, y: 0.84, scale: 1.0, color: '#c1440e' },
        { x: 0.62, y: 0.93, scale: 0.9, color: '#eab676' },
        { x: 0.75, y: 0.88, scale: 1.1, color: '#e25822' },
        { x: 0.88, y: 0.91, scale: 1.0, color: '#b5832d' }
    ];

    function drawAutumnTree(ctx, x, y, scale, color) {
        // Tronco
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = '#7b3f00';
        ctx.lineWidth = 8 * scale;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - 40 * scale);
        ctx.stroke();
        ctx.restore();

        // Copa (folhas)
        ctx.save();
        ctx.globalAlpha = 0.93;
        ctx.beginPath();
        ctx.arc(x, y - 50 * scale, 28 * scale, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 18 * scale;
        ctx.fill();
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(x - 18 * scale, y - 38 * scale, 16 * scale, 0, 2 * Math.PI);
        ctx.arc(x + 15 * scale, y - 38 * scale, 13 * scale, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        // Galhos simples
        ctx.save();
        ctx.strokeStyle = '#7b3f00';
        ctx.lineWidth = 3 * scale;
        ctx.beginPath();
        ctx.moveTo(x, y - 30 * scale);
        ctx.lineTo(x - 10 * scale, y - 45 * scale);
        ctx.moveTo(x, y - 35 * scale);
        ctx.lineTo(x + 12 * scale, y - 48 * scale);
        ctx.stroke();
        ctx.restore();
    }

    // Desenha montanhas, céu e árvores de outono
    function drawMountains() {
        ctx.clearRect(0, 0, width, height);

        // Céu azul claro (ajustado para não ocupar toda a altura, só acima das montanhas)
        const skyHeight = height * 0.7;
        ctx.fillStyle = '#b3e0ff';
        ctx.fillRect(0, 0, width, skyHeight);

        // Sol
        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(width - 120, 70, 45, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffe066';
        ctx.shadowColor = '#ffe066';
        ctx.shadowBlur = 40;
        ctx.fill();
        ctx.restore();

        // Montanhas distantes (azul claro)
        ctx.beginPath();
        ctx.moveTo(0, height * 0.7);
        ctx.lineTo(width * 0.2, height * 0.5);
        ctx.lineTo(width * 0.4, height * 0.65);
        ctx.lineTo(width * 0.6, height * 0.48);
        ctx.lineTo(width * 0.8, height * 0.6);
        ctx.lineTo(width, height * 0.5);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = '#a3b9d2';
        ctx.fill();

        // Montanhas médias (cinza-azulado)
        ctx.beginPath();
        ctx.moveTo(0, height * 0.85);
        ctx.lineTo(width * 0.15, height * 0.65);
        ctx.lineTo(width * 0.35, height * 0.8);
        ctx.lineTo(width * 0.55, height * 0.62);
        ctx.lineTo(width * 0.75, height * 0.78);
        ctx.lineTo(width, height * 0.7);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = '#7a8fa6';
        ctx.fill();

        // Montanhas próximas (marrom claro)
        ctx.beginPath();
        ctx.moveTo(0, height * 0.98);
        ctx.lineTo(width * 0.1, height * 0.82);
        ctx.lineTo(width * 0.25, height * 0.95);
        ctx.lineTo(width * 0.45, height * 0.85);
        ctx.lineTo(width * 0.65, height * 0.98);
        ctx.lineTo(width * 0.85, height * 0.88);
        ctx.lineTo(width, height * 0.97);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = '#b5832d';
        ctx.fill();

        // Árvores de outono (espalhadas na base das montanhas próximas)
        for (const tree of autumnTrees) {
            const tx = tree.x * width;
            const ty = tree.y * height;
            drawAutumnTree(ctx, tx, ty, tree.scale * (width / 1200), tree.color);
        }
    }

    const leaves = [];
    function getCount() {
        return Math.max(18, Math.floor(width / 30));
    }
    function createLeaf() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 10 + 8,
            speed: Math.random() * 1.2 + 0.4,
            wind: Math.random() * 1.5 - 0.8,
            color: leafColors[Math.floor(Math.random() * leafColors.length)],
            shape: leafShapes[Math.floor(Math.random() * leafShapes.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.03
        };
    }
    function fillLeaves() {
        const target = getCount();
        while (leaves.length < target) leaves.push(createLeaf());
        while (leaves.length > target) leaves.pop();
    }
    fillLeaves();
    window.addEventListener('resize', fillLeaves);

    function drawLeaves() {
        ctx.save();
        ctx.globalAlpha = 0.92;
        for (let leaf of leaves) {
            ctx.fillStyle = leaf.color;
            leaf.shape(ctx, leaf.x, leaf.y, leaf.radius, leaf.rotation);
        }
        ctx.restore();
    }

    // --- Pessoas andando de perfil (simples, não Mario) ---

    // Configuração dos dois bonecos (um vermelho, um verde)
    const walkers = [
        {
            x: 0,
            y: 0,
            w: 38,
            h: 60,
            dir: 1,
            step: 0,
            speed: 1.7,
            groundY: 0,
            color: "#c1440e", // vermelho
            facing: "right"
        },
        {
            x: 0,
            y: 0,
            w: 38,
            h: 60,
            dir: -1,
            step: Math.PI,
            speed: 1.7,
            groundY: 0,
            color: "#1cc700", // verde
            facing: "left"
        }
    ];

    // Inicializa posições e direção
    function randomizeWalkers() {
        walkers[0].x = walkers[0].w / 2;
        walkers[0].dir = 1;
        walkers[0].facing = "right";
        walkers[1].x = width - walkers[1].w / 2;
        walkers[1].dir = -1;
        walkers[1].facing = "left";
        walkers[0].groundY = walkers[1].groundY = height * 0.98 - walkers[0].h / 2;
        walkers[0].y = walkers[1].y = walkers[0].groundY;
    }
    randomizeWalkers();
    window.addEventListener('resize', randomizeWalkers);

    // Desenha uma pessoa de perfil (simples, estilizada)
    function drawPersonProfile(ctx, x, y, w, h, step, color, facing) {
        ctx.save();
        ctx.translate(x, y);

        // Espelha para esquerda se necessário
        if (facing === "left") {
            ctx.scale(-1, 1);
        }

        // Pernas (animação de caminhada)
        ctx.save();
        ctx.strokeStyle = "#444";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        // perna de trás
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(w * 0.08, h * 0.38);
        ctx.lineTo(w * 0.08, h * 0.38 + 18 - 8 * Math.sin(step));
        ctx.stroke();
        ctx.globalAlpha = 1;
        // perna da frente
        ctx.beginPath();
        ctx.moveTo(-w * 0.08, h * 0.38);
        ctx.lineTo(-w * 0.08, h * 0.38 + 18 + 8 * Math.sin(step));
        ctx.stroke();
        ctx.restore();

        // Corpo (camisa colorida)
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(-w * 0.13, h * 0.08, w * 0.26, h * 0.38);
        ctx.restore();

        // Braços (corpo lateral)
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        // braço de trás
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(w * 0.13, h * 0.13);
        ctx.lineTo(w * 0.28, h * 0.27 - 10 * Math.sin(step));
        ctx.stroke();
        ctx.globalAlpha = 1;
        // braço da frente
        ctx.beginPath();
        ctx.moveTo(-w * 0.13, h * 0.13);
        ctx.lineTo(-w * 0.28, h * 0.27 + 10 * Math.sin(step));
        ctx.stroke();
        ctx.restore();

        // Mãos (bege)
        ctx.save();
        ctx.fillStyle = "#f7d7b1";
        // mão de trás
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(w * 0.28, h * 0.27 - 10 * Math.sin(step), 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
        // mão da frente
        ctx.beginPath();
        ctx.arc(-w * 0.28, h * 0.27 + 10 * Math.sin(step), 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        // Cabeça (bege)
        ctx.save();
        ctx.fillStyle = "#f7d7b1";
        ctx.beginPath();
        ctx.ellipse(0, -h * 0.07, w * 0.17, h * 0.19, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        // Cabelo (simples, perfil)
        ctx.save();
        ctx.fillStyle = "#3b2d1a";
        ctx.beginPath();
        ctx.ellipse(-w * 0.04, -h * 0.13, w * 0.13, h * 0.09, 0, 0, Math.PI, true);
        ctx.fill();
        ctx.restore();

        // Olho (preto, perfil)
        ctx.save();
        ctx.fillStyle = "#222";
        ctx.beginPath();
        ctx.arc(w * 0.07, -h * 0.09, 2.2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        // Calça (azul escuro)
        ctx.save();
        ctx.fillStyle = "#2d3b5a";
        ctx.fillRect(-w * 0.13, h * 0.38, w * 0.26, h * 0.18);
        ctx.restore();

        ctx.restore();
    }

    function updateWalkers() {
        // Vermelho vai da esquerda para direita e volta, verde da direita para esquerda e volta
        for (let i = 0; i < walkers.length; i++) {
            let wlk = walkers[i];
            if (typeof wlk.groundY !== "number" || wlk.groundY === 0) {
                wlk.groundY = height * 0.98 - wlk.h / 2;
                wlk.y = wlk.groundY;
            }
            wlk.x += wlk.speed * wlk.dir;
            if (i === 0) { // vermelho
                if (wlk.x > width - wlk.w / 2) {
                    wlk.dir = -1;
                    wlk.x = width - wlk.w / 2;
                    wlk.facing = "left";
                }
                if (wlk.x < wlk.w / 2) {
                    wlk.dir = 1;
                    wlk.x = wlk.w / 2;
                    wlk.facing = "right";
                }
            } else { // verde
                if (wlk.x < wlk.w / 2) {
                    wlk.dir = 1;
                    wlk.x = wlk.w / 2;
                    wlk.facing = "right";
                }
                if (wlk.x > width - wlk.w / 2) {
                    wlk.dir = -1;
                    wlk.x = width - wlk.w / 2;
                    wlk.facing = "left";
                }
            }
            wlk.step += 0.18;
        }
    }

    function drawWalkers() {
        for (let wlk of walkers) {
            drawPersonProfile(ctx, wlk.x, wlk.y, wlk.w, wlk.h, Math.sin(wlk.step), wlk.color, wlk.facing);
        }
    }

    function animate() {
        drawMountains();
        drawLeaves();
        update();
        updateWalkers();
        drawWalkers();
        requestAnimationFrame(animate);
    }

    function update() {
        for (let leaf of leaves) {
            leaf.y += leaf.speed;
            leaf.x += leaf.wind + Math.sin(leaf.y / 40) * 0.7;
            leaf.rotation += leaf.rotationSpeed;
            if (leaf.y > height + 20) {
                leaf.y = -20;
                leaf.x = Math.random() * width;
                leaf.color = leafColors[Math.floor(Math.random() * leafColors.length)];
                leaf.shape = leafShapes[Math.floor(Math.random() * leafShapes.length)];
            }
            if (leaf.x < -20) leaf.x = width + 10;
            if (leaf.x > width + 20) leaf.x = -10;
        }
    }
    animate();
});