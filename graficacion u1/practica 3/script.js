const canvas = document.getElementById('lienzoDDA');
const ctx = canvas.getContext('2d');
let puntos = [];

function dibujarPixel(x, y) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(Math.round(x), Math.round(y), 2, 2);
}

function algoritmoDDA(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let pasos = Math.max(Math.abs(dx), Math.abs(dy));

    let incX = dx / pasos;
    let incY = dy / pasos;
    let x = x1;
    let y = y1;

    for (let i = 0; i <= pasos; i++) {
        dibujarPixel(x, y);
        x += incX;
        y += incY;
    }
}

canvas.addEventListener('mousedown', function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    puntos.push({ x, y });
    dibujarPixel(x, y);

    if (puntos.length === 2) {
        algoritmoDDA(puntos[0].x, puntos[0].y, puntos[1].x, puntos[1].y);
        puntos = [];
    }
});

function limpiarLienzo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    puntos = [];
}