const colorPicker = document.getElementById('colorPicker');
const boxBase = document.getElementById('boxBase'); 
const boxHover = document.getElementById('boxHover'); 
const boxDisabled = document.getElementById('boxDisabled');


// Convierte de HEX a RGB 
function hexToRGB(hex) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    return { r, g, b };
}

// Convierte de RGB a HSL 
function rgbToHSL(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // Escala de grises
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break; 
            case b: h = (r - g) / d + 4; break;
        }         
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
function generarPaleta() {
    let hex = colorPicker.value; let rgb = hexToRGB(hex);
    let hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);
    // 1. Color Base
    boxBase.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    
    // 2. Color Hover (Restamos 15% a la luminosidad, evitando números negativos)    
    let hoverL = Math.max(0, hsl.l - 15);
    boxHover.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${hoverL}%)`;

    // 3. Color Disabled     
    boxDisabled.style.backgroundColor = `hsl(${hsl.h}, 0%, 80%)`; }   
    // Escuchar cambios en el input
    colorPicker.addEventListener('input', generarPaleta);

// Ejecución inicial 
    generarPaleta();
