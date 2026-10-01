const canvas = document.getElementById('lienzoImagen');
const ctx = canvas.getContext('2d');

const sliderUmbral = document.getElementById('sliderUmbral');
const valUmbral = document.getElementById('valUmbral');

const btnGris = document.getElementById('btnGris');
const btnUmbral = document.getElementById('btnUmbral');
const btnReset = document.getElementById('btnReset');

// Guardará la copia exacta de los píxeles originales
let datosOriginales = null;
// Mantiene el estado actual de la vista ('original', 'gris', 'binario')
let modoActual = 'original';

// Dibuja la imagen original a color (Fondo amarillo claro, Sello rojo y Texto azul)
function dibujarImagenPrueba() {
  // Fondo claro
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(0, 0, 400, 300);

  // Círculo rojo (Sello)
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(200, 150, 80, 0, Math.PI * 2);
  ctx.fill();

  // Texto azul (Firma)
  ctx.fillStyle = '#1d4ed8';
  ctx.font = '30px Arial';
  ctx.fillText("APROBADO", 110, 160);

  // Guardamos una copia limpia de los píxeles iniciales
  datosOriginales = ctx.getImageData(0, 0, canvas.width, canvas.height);
  modoActual = 'original';
  
  btnGris.classList.remove('active');
  btnUmbral.classList.remove('active');
}

// Filtro a escala de grises (Con ajuste de tono/brillo progresivo según el slider)
function aplicarEscalaGrises() {
  if (!datosOriginales) return;

  modoActual = 'gris';
  btnGris.classList.add('active');
  btnUmbral.classList.remove('active');

  let imgData = ctx.createImageData(datosOriginales);
  let datosOri = datosOriginales.data;
  let datosNuevos = imgData.data;

  // El slider actuará como factor de intensidad/brillo sobre la escala de grises
  let factor = parseInt(sliderUmbral.value) / 128; // Rango dinámico (0 a 2 aprox)

  for (let i = 0; i < datosOri.length; i += 4) {
    let r = datosOri[i];
    let g = datosOri[i + 1];
    let b = datosOri[i + 2];
    let a = datosOri[i + 3];

    // Fórmula de luminancia para escala de grises
    let gris = (r * 0.30) + (g * 0.59) + (b * 0.11);
    
    // Modificamos el valor de gris según el control deslizante
    let grisAjustado = Math.min(255, Math.max(0, gris * factor));

    datosNuevos[i] = grisAjustado;
    datosNuevos[i + 1] = grisAjustado;
    datosNuevos[i + 2] = grisAjustado;
    datosNuevos[i + 3] = a;
  }

  ctx.putImageData(imgData, 0, 0);
}

// Filtro de binarización OCR (Contraste puro Blanco y Negro)
function aplicarUmbral() {
  if (!datosOriginales) return;

  modoActual = 'binario';
  btnUmbral.classList.add('active');
  btnGris.classList.remove('active');

  let imgData = ctx.createImageData(datosOriginales);
  let datosOri = datosOriginales.data;
  let datosNuevos = imgData.data;
  let umbralLimite = parseInt(sliderUmbral.value);

  for (let i = 0; i < datosOri.length; i += 4) {
    let r = datosOri[i];
    let g = datosOri[i + 1];
    let b = datosOri[i + 2];
    let a = datosOri[i + 3];

    // Calculamos el valor de brillo del píxel original
    let gris = (r * 0.30) + (g * 0.59) + (b * 0.11);

    // Binarización: Si el brillo supera el umbral es blanco (255), de lo contrario es negro (0)
    let colorFinal = (gris > umbralLimite) ? 255 : 0;

    datosNuevos[i] = colorFinal;
    datosNuevos[i + 1] = colorFinal;
    datosNuevos[i + 2] = colorFinal;
    datosNuevos[i + 3] = a;
  }

  ctx.putImageData(imgData, 0, 0);
}

// Event Listeners
btnGris.addEventListener('click', aplicarEscalaGrises);
btnUmbral.addEventListener('click', aplicarUmbral);
btnReset.addEventListener('click', dibujarImagenPrueba);

// Evento del Slider: Modifica la vista actual de acuerdo al modo activo
sliderUmbral.addEventListener('input', (e) => {
  valUmbral.textContent = e.target.value;

  if (modoActual === 'gris') {
    aplicarEscalaGrises();
  } else if (modoActual === 'binario') {
    aplicarUmbral();
  }
});

// Inicialización
dibujarImagenPrueba();