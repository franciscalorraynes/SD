import React, { useState } from "react";

const instrumentos = {
  Piano: "sine",
  Guitarra: "square",
  Violino: "triangle",
  Saxofone: "sawtooth",
};

const notas = [
  { nome: "C", freq: 261.63 },
  { nome: "D", freq: 293.66 },
  { nome: "E", freq: 329.63 },
  { nome: "F", freq: 349.23 },
  { nome: "G", freq: 392.00 },
  { nome: "A", freq: 440.00 },
  { nome: "B", freq: 493.88 },
];

function tocarNota(freq, tipoOnda) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = tipoOnda;
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.5);
}

const instrumentosSVG = {
  Piano: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 text-indigo-600">
      <path d="M2 3v18h20V3H2zm18 16H4v-2h16v2zm0-4H4v-2h16v2zm0-4H4V9h16v2zm0-4H4V5h16v2z"/>
    </svg>
  ),
  Guitarra: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 text-yellow-600">
      <path d="M12 1l2 7-6 6 7 2-2 6 6 1-1-6-7-2 6-6-7-2 2-7h-6z"/>
    </svg>
  ),
  Violino: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 text-green-600">
      <path d="M12 1v22m0-22l3 4m-3-4l-3 4m3 6l3-4m-3 4l-3-4m0 6v4h6v-4m-6 4H6v-4h6z"/>
    </svg>
  ),
  Saxofone: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 text-orange-600">
      <path d="M12 3v10h-2V5c-1 0-2 1-2 2s1 2 2 2h2v2h-2v4h-2v-4h-2V7c-1 0-2 1-2 2s1 2 2 2h2v2h-2v4h-2v-4h-2v2h-2v-2c-1 0-2-1-2-2s1-2 2-2h2v2h2V5c1 0 2-1 2-2s-1-2-2-2h-2V1h2z"/>
    </svg>
  ),
};

export default function App() {
  const [instrumentoSelecionado, setInstrumentoSelecionado] = useState("Piano");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex flex-col items-center p-6">
      <h1 className="text-5xl font-extrabold text-indigo-800 mb-6 drop-shadow-md">🎼 Estúdio Musical</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {Object.keys(instrumentos).map((instrumento) => (
          <button
            key={instrumento}
            onClick={() => setInstrumentoSelecionado(instrumento)}
            className={`p-4 rounded-xl font-medium text-sm shadow-lg transition-all duration-300 ${
              instrumento === instrumentoSelecionado
                ? "bg-indigo-600 text-white scale-105"
                : "bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-100"
            }`}
          >
            {instrumentosSVG[instrumento]}
            <span className="mt-2 block">{instrumento}</span>
          </button>
        ))}
      </div>

      <p className="text-lg text-indigo-800 mb-4">
        Instrumento: <span className="font-bold">{instrumentoSelecionado}</span>
      </p>

      <div className="flex gap-3 flex-wrap justify-center">
        {notas.map((nota) => (
          <button
            key={nota.nome}
            onClick={() => tocarNota(nota.freq, instrumentos[instrumentoSelecionado])}
            className="w-16 h-40 bg-white text-indigo-700 font-bold border-2 border-indigo-300 rounded-xl shadow-md flex items-end justify-center pb-4 hover:bg-indigo-100 active:bg-indigo-300 transition-all duration-150"
          >
            {nota.nome}
          </button>
        ))}
      </div>
    </div>
  );
}
