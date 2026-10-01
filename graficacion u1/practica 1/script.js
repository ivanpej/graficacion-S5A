const canvas = document.getElementById('lienzo'); 
const ctx = canvas.getContext('2d');

const ancho = canvas.width; 
const alto = canvas.height; 
const centroX = ancho / 2; 
const centroY = alto / 2;

const cuadricula = 50;
// Función matemática para convertir coordenadas
// El origen (0,0) matemático se traslada al centro del Canvas
// El eje Y se invierte multiplicando por -1 
function convertirCoordenadas(x_mate, y_mate) {
    return {
        x: centroX + x_mate,         
        y: centroY + (y_mate * -1) 
    };
}

function dibujarcuadricula(){
    ctx.strokeStyle = '#062243';
    ctx.lineWidth = 1;

for (let x = centroX % cuadricula; x <= ancho; x += cuadricula) {
    ctx.beginPath();
    ctx.moveTo (x, 0);
    ctx.lineTo (x, alto);
    ctx.stroke();
}

for (let y = centroY % cuadricula; y <= alto; y += cuadricula) {
    ctx.beginPath();
    ctx.moveTo (0, y); 
    ctx.lineTo (ancho, y); 
    ctx.stroke();
}
}

    


// Dibujar Ejes de Referencia (Plano Cartesiano)
function dibujarEjes() {     
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;     
    ctx.beginPath();
    // Eje X
    ctx.moveTo(0, centroY);     
    ctx.lineTo(ancho, centroY);
    // Eje Y
    ctx.moveTo(centroX, 0);     
    ctx.lineTo(centroX, alto);
    ctx.stroke(); }
// Vértices del rack industrial (Polígono)
const rackVertices = [     
    { x: -150, y: 100 },
    { x: 150, y: 100 },
    { x: 150, y: -100 },
    { x: -150, y: -100 }
];
// Función para renderizar el polígono
function dibujarRack() {
    ctx.strokeStyle = '#2563eb'; // Azul corporativo
    ctx.lineWidth = 3;     
    ctx.beginPath();
    
    for (let i = 0; i < rackVertices.length; i++) {
        let punto = convertirCoordenadas(rackVertices[i].x, rackVertices[i].y);
  
        if (i === 0) {
            ctx.moveTo(punto.x, punto.y);
        } else {
            ctx.lineTo(punto.x, punto.y);
        }
    }
    ctx.closePath(); // Cierra el polígono uniendo el último punto con el primero     
     ctx.stroke(); }
// Ejecución 
dibujarEjes();
dibujarRack();
dibujarcuadricula();

