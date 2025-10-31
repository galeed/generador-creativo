import React, { useState, useEffect } from ‘react’;
import { Shuffle, Copy, Check, Palette, Sparkles, Type } from ‘lucide-react’;

const CreativeGenerator = () => {
const [palette, setPalette] = useState([]);
const [pattern, setPattern] = useState(‘circles’);
const [fontPair, setFontPair] = useState({ heading: ‘’, body: ‘’ });
const [copied, setCopied] = useState(false);
const [animationKey, setAnimationKey] = useState(0);

const patterns = [‘circles’, ‘squares’, ‘triangles’, ‘waves’, ‘gradient’, ‘mosaic’];

const fontPairs = [
{ heading: ‘Playfair Display’, body: ‘Source Sans Pro’, style: ‘Elegante’ },
{ heading: ‘Montserrat’, body: ‘Open Sans’, style: ‘Moderno’ },
{ heading: ‘Raleway’, body: ‘Lato’, style: ‘Limpio’ },
{ heading: ‘Oswald’, body: ‘Roboto’, style: ‘Fuerte’ },
{ heading: ‘Merriweather’, body: ‘Lora’, style: ‘Clásico’ },
{ heading: ‘Bebas Neue’, body: ‘Nunito’, style: ‘Impactante’ },
{ heading: ‘Poppins’, body: ‘Inter’, style: ‘Profesional’ },
{ heading: ‘Abril Fatface’, body: ‘Noto Sans’, style: ‘Artístico’ },
{ heading: ‘Righteous’, body: ‘Karla’, style: ‘Divertido’ },
{ heading: ‘Archivo Black’, body: ‘Work Sans’, style: ‘Audaz’ },
{ heading: ‘Cinzel’, body: ‘Crimson Text’, style: ‘Sofisticado’ },
{ heading: ‘Josefin Sans’, body: ‘Quicksand’, style: ‘Fresco’ }
];

const colorSchemes = [
{ name: ‘Vibrante’, hues: [0, 45, 180, 280, 320] },
{ name: ‘Pastel’, hues: [30, 120, 200, 280, 330] },
{ name: ‘Oscuro’, hues: [0, 60, 180, 240, 300] },
{ name: ‘Neón’, hues: [90, 180, 270, 330, 60] },
{ name: ‘Tierra’, hues: [20, 30, 40, 100, 200] },
{ name: ‘Océano’, hues: [180, 190, 200, 210, 220] }
];

const generateColor = (hue, scheme) => {
let saturation, lightness;

```
switch(scheme) {
  case 'Pastel':
    saturation = 60 + Math.random() * 20;
    lightness = 75 + Math.random() * 15;
    break;
  case 'Oscuro':
    saturation = 40 + Math.random() * 40;
    lightness = 20 + Math.random() * 30;
    break;
  case 'Neón':
    saturation = 90 + Math.random() * 10;
    lightness = 50 + Math.random() * 20;
    break;
  case 'Tierra':
    saturation = 30 + Math.random() * 30;
    lightness = 40 + Math.random() * 30;
    break;
  case 'Océano':
    saturation = 60 + Math.random() * 30;
    lightness = 45 + Math.random() * 30;
    break;
  default:
    saturation = 70 + Math.random() * 25;
    lightness = 50 + Math.random() * 20;
}

return `hsl(${hue + (Math.random() - 0.5) * 20}, ${saturation}%, ${lightness}%)`;
```

};

const generatePalette = () => {
const scheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
const colors = scheme.hues.map(hue => generateColor(hue, scheme.name));
setPalette(colors);
setAnimationKey(prev => prev + 1);
};

const generatePattern = () => {
const newPattern = patterns[Math.floor(Math.random() * patterns.length)];
setPattern(newPattern);
setAnimationKey(prev => prev + 1);
};

const generateFonts = () => {
const pair = fontPairs[Math.floor(Math.random() * fontPairs.length)];
setFontPair(pair);
setAnimationKey(prev => prev + 1);
};

const generateAll = () => {
generatePalette();
generatePattern();
generateFonts();
};

useEffect(() => {
generateAll();
}, []);

const copyPalette = () => {
const colorText = palette.join(’\n’);
navigator.clipboard.writeText(colorText);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
};

const copyFonts = () => {
const fontText = `Título: ${fontPair.heading}\nCuerpo: ${fontPair.body}`;
navigator.clipboard.writeText(fontText);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
};

const renderPattern = () => {
const elements = [];

```
switch(pattern) {
  case 'circles':
    for(let i = 0; i < 30; i++) {
      const size = 20 + Math.random() * 80;
      elements.push(
        <circle
          key={i}
          cx={Math.random() * 100 + '%'}
          cy={Math.random() * 100 + '%'}
          r={size}
          fill={palette[Math.floor(Math.random() * palette.length)]}
          opacity={0.6 + Math.random() * 0.4}
        />
      );
    }
    break;
    
  case 'squares':
    for(let i = 0; i < 25; i++) {
      const size = 30 + Math.random() * 70;
      elements.push(
        <rect
          key={i}
          x={Math.random() * 100 + '%'}
          y={Math.random() * 100 + '%'}
          width={size}
          height={size}
          fill={palette[Math.floor(Math.random() * palette.length)]}
          opacity={0.7 + Math.random() * 0.3}
          transform={`rotate(${Math.random() * 45}, ${Math.random() * 100}, ${Math.random() * 100})`}
        />
      );
    }
    break;
    
  case 'triangles':
    for(let i = 0; i < 20; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 40 + Math.random() * 60;
      elements.push(
        <polygon
          key={i}
          points={`${x},${y} ${x + size},${y} ${x + size/2},${y - size}`}
          fill={palette[Math.floor(Math.random() * palette.length)]}
          opacity={0.6 + Math.random() * 0.4}
        />
      );
    }
    break;
    
  case 'waves':
    for(let i = 0; i < 8; i++) {
      const y = i * 15;
      elements.push(
        <path
          key={i}
          d={`M 0 ${y} Q 25 ${y + 10}, 50 ${y} T 100 ${y}`}
          stroke={palette[i % palette.length]}
          strokeWidth="3"
          fill="none"
          opacity={0.7}
        />
      );
    }
    break;
    
  case 'gradient':
    return (
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          {palette.map((color, i) => (
            <stop key={i} offset={`${(i / (palette.length - 1)) * 100}%`} stopColor={color} />
          ))}
        </linearGradient>
        <rect width="100%" height="100%" fill="url(#grad)" />
      </defs>
    );
    
  case 'mosaic':
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        elements.push(
          <rect
            key={`${i}-${j}`}
            x={i * 12.5 + '%'}
            y={j * 12.5 + '%'}
            width="12.5%"
            height="12.5%"
            fill={palette[Math.floor(Math.random() * palette.length)]}
            opacity={0.7 + Math.random() * 0.3}
          />
        );
      }
    }
    break;
}

return elements;
```

};

return (
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 md:p-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@700&family=Raleway:wght@700&family=Oswald:wght@700&family=Merriweather:wght@700&family=Bebas+Neue&family=Poppins:wght@700&family=Abril+Fatface&family=Righteous&family=Archivo+Black&family=Cinzel:wght@700&family=Josefin+Sans:wght@700&family=Source+Sans+Pro&family=Open+Sans&family=Lato&family=Roboto&family=Lora&family=Nunito&family=Inter&family=Noto+Sans&family=Karla&family=Work+Sans&family=Crimson+Text&family=Quicksand&display=swap" rel="stylesheet" />

```
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
        <Palette className="w-10 h-10 md:w-12 md:h-12" />
        Generador Creativo
      </h1>
      <p className="text-purple-200 text-lg">Colores, patrones y tipografías infinitas</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-6 mb-6">
      {/* Patrón Artístico */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            Patrón
          </h2>
          <button
            onClick={generatePattern}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
          >
            <Shuffle className="w-4 h-4" />
            Cambiar
          </button>
        </div>
        
        <div key={`pattern-${animationKey}`} className="bg-white rounded-xl overflow-hidden shadow-2xl animate-fadeIn">
          <svg viewBox="0 0 100 100" className="w-full h-64 md:h-80" preserveAspectRatio="xMidYMid slice">
            {renderPattern()}
          </svg>
        </div>
        
        <p className="text-purple-200 text-center mt-3 text-sm capitalize">
          Patrón: {pattern}
        </p>
      </div>

      {/* Paleta de Colores */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">Colores</h2>
          <button
            onClick={generatePalette}
            className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
          >
            <Shuffle className="w-4 h-4" />
            Cambiar
          </button>
        </div>

        <div key={`palette-${animationKey}`} className="space-y-3 animate-fadeIn">
          {palette.map((color, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
            >
              <div
                className="w-14 h-14 rounded-lg shadow-lg border-2 border-white/20"
                style={{ backgroundColor: color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-mono text-xs md:text-sm truncate">{color}</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(color);
                }}
                className="text-purple-300 hover:text-white transition-colors p-2"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={copyPalette}
          className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors border border-white/20 text-sm"
          >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copiar paleta
        </button>
      </div>

      {/* Tipografías */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <Type className="w-5 h-5 md:w-6 md:h-6" />
            Fuentes
          </h2>
          <button
            onClick={generateFonts}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
          >
            <Shuffle className="w-4 h-4" />
            Cambiar
          </button>
        </div>

        <div key={`fonts-${animationKey}`} className="animate-fadeIn space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <p className="text-purple-300 text-xs mb-2 uppercase tracking-wider">Título</p>
            <h3 
              className="text-white text-3xl md:text-4xl mb-2"
              style={{ fontFamily: fontPair.heading }}
            >
              {fontPair.heading}
            </h3>
            <p className="text-purple-200 text-xs font-mono">{fontPair.heading}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <p className="text-purple-300 text-xs mb-2 uppercase tracking-wider">Cuerpo de texto</p>
            <p 
              className="text-white text-base md:text-lg mb-2"
              style={{ fontFamily: fontPair.body }}
            >
              Esta es una muestra del texto con la fuente {fontPair.body}. Perfecta para párrafos y contenido.
            </p>
            <p className="text-purple-200 text-xs font-mono">{fontPair.body}</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-400/30">
            <p className="text-blue-200 text-sm font-semibold">
              Estilo: {fontPair.style}
            </p>
          </div>
        </div>

        <button
          onClick={copyFonts}
          className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors border border-white/20 text-sm"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copiar fuentes
        </button>
      </div>
    </div>

    <button
      onClick={generateAll}
      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl text-lg md:text-xl font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-2xl"
    >
      <Shuffle className="w-5 h-5 md:w-6 md:h-6" />
      Generar Todo Nuevo
    </button>
  </div>

  <style jsx>{`
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
  `}</style>
</div>
```

);
};

export default CreativeGenerator;
