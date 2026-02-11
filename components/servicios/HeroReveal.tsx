'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

// ============================================================
// HERO - Left text + Right chaos→order reveal
// For Grupo Alternative - keeps existing hero layout
// ============================================================

const COLORS = {
  azulMarino: '#0a1628',
  azulMarinoLight: '#0d1f3c',
  turquesa: '#6cc4d4',
  menta: '#cbe6b1',
  violeta: '#6b5ce7',
  blancoHueso: '#f5f2eb',
};

// Process nodes for the right panel
const NODES = [
  { id: 1, icon: '📊', label: 'Análisis' },
  { id: 2, icon: '📋', label: 'Planificación' },
  { id: 3, icon: '⚙️', label: 'Ejecución' },
  { id: 4, icon: '📈', label: 'Medición' },
  { id: 5, icon: '🔄', label: 'Mejora' },
  { id: 6, icon: '✅', label: 'Control' },
  { id: 7, icon: '🎯', label: 'Objetivos' },
  { id: 8, icon: '📝', label: 'Docs' },
  { id: 9, icon: '🤝', label: 'Equipo' },
];

// Chaotic layout — scattered, rotated, overlapping
const CHAOS = [
  { x: 10, y: 8, r: -28, s: 0.82, o: 0.5 },
  { x: 75, y: 5, r: 42, s: 1.05, o: 0.45 },
  { x: 42, y: 60, r: -15, s: 0.7, o: 0.6 },
  { x: 85, y: 52, r: 35, s: 0.88, o: 0.4 },
  { x: 18, y: 78, r: -40, s: 1.0, o: 0.5 },
  { x: 58, y: 28, r: 22, s: 0.75, o: 0.55 },
  { x: 30, y: 38, r: -50, s: 0.9, o: 0.45 },
  { x: 88, y: 80, r: 48, s: 0.78, o: 0.5 },
  { x: 62, y: 82, r: -18, s: 0.85, o: 0.4 },
];

// Ordered layout — clean 3x3 grid
const ORDER = [
  { x: 16, y: 15, r: 0, s: 1, o: 1 },
  { x: 50, y: 15, r: 0, s: 1, o: 1 },
  { x: 84, y: 15, r: 0, s: 1, o: 1 },
  { x: 16, y: 48, r: 0, s: 1, o: 1 },
  { x: 50, y: 48, r: 0, s: 1, o: 1 },
  { x: 84, y: 48, r: 0, s: 1, o: 1 },
  { x: 16, y: 81, r: 0, s: 1, o: 1 },
  { x: 50, y: 81, r: 0, s: 1, o: 1 },
  { x: 84, y: 81, r: 0, s: 1, o: 1 },
];

// Chaotic lines (tangled red)
const CHAOS_LINES = [
  { x1: 15, y1: 14, x2: 78, y2: 10, c: 35 },
  { x1: 45, y1: 65, x2: 88, y2: 56, c: -28 },
  { x1: 22, y1: 83, x2: 62, y2: 32, c: 45 },
  { x1: 33, y1: 42, x2: 90, y2: 84, c: -38 },
  { x1: 60, y1: 86, x2: 12, y2: 12, c: 55 },
];

// Ordered lines (clean arrows)
const ORDER_LINES = [
  // Row 1 horizontal
  { x1: 26, y1: 15, x2: 40, y2: 15 },
  { x1: 60, y1: 15, x2: 74, y2: 15 },
  // Row 2 horizontal
  { x1: 26, y1: 48, x2: 40, y2: 48 },
  { x1: 60, y1: 48, x2: 74, y2: 48 },
  // Row 3 horizontal
  { x1: 26, y1: 81, x2: 40, y2: 81 },
  { x1: 60, y1: 81, x2: 74, y2: 81 },
  // Vertical connectors
  { x1: 16, y1: 25, x2: 16, y2: 38 },
  { x1: 50, y1: 25, x2: 50, y2: 38 },
  { x1: 84, y1: 25, x2: 84, y2: 38 },
  { x1: 16, y1: 58, x2: 16, y2: 71 },
  { x1: 50, y1: 58, x2: 50, y2: 71 },
  { x1: 84, y1: 58, x2: 84, y2: 71 },
];

export default function HeroReveal() {
  const panelRef = useRef<HTMLDivElement>(null);
  const orderedLayerRef = useRef<HTMLDivElement>(null);
  const spotlightRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -500, y: -500 });
  const hoveringRef = useRef(false);
  const rafRef = useRef<number>(0);
  const [isFullReveal, setIsFullReveal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const spotlightR = 160;

  // Direct DOM update — no React re-render per mouse move
  const updateDOM = useCallback(() => {
    const { x, y } = mouseRef.current;
    const hovering = hoveringRef.current;

    if (orderedLayerRef.current) {
      if (hovering) {
        orderedLayerRef.current.style.clipPath = `circle(${spotlightR}px at ${x}px ${y}px)`;
        orderedLayerRef.current.style.transition = 'clip-path 0.02s linear';
      }
    }

    if (spotlightRingRef.current) {
      spotlightRingRef.current.style.left = `${x - spotlightR}px`;
      spotlightRingRef.current.style.top = `${y - spotlightR}px`;
      spotlightRingRef.current.style.display = hovering ? 'block' : 'none';
    }

    if (cursorDotRef.current) {
      cursorDotRef.current.style.left = `${x}px`;
      cursorDotRef.current.style.top = `${y}px`;
      cursorDotRef.current.style.display = hovering ? 'block' : 'none';
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateDOM);
  }, [updateDOM]);

  const handleMouseEnter = useCallback(() => {
    hoveringRef.current = true;
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoveringRef.current = false;
    mouseRef.current = { x: -500, y: -500 };
    setIsHovering(false);

    // Animate clip-path back to 0
    if (orderedLayerRef.current) {
      orderedLayerRef.current.style.transition = 'clip-path 0.4s ease-in';
      orderedLayerRef.current.style.clipPath = 'circle(0px at -500px -500px)';
    }
    if (spotlightRingRef.current) spotlightRingRef.current.style.display = 'none';
    if (cursorDotRef.current) cursorDotRef.current.style.display = 'none';
  }, []);

  // Sync full reveal state with ordered layer
  useEffect(() => {
    if (!orderedLayerRef.current) return;
    if (isFullReveal) {
      orderedLayerRef.current.style.transition = 'clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
      orderedLayerRef.current.style.clipPath = 'circle(150% at 50% 50%)';
    } else {
      orderedLayerRef.current.style.transition = 'clip-path 0.6s ease-in';
      orderedLayerRef.current.style.clipPath = 'circle(0px at 50% 50%)';
    }
  }, [isFullReveal]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap"
        rel="stylesheet"
      />

      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: COLORS.azulMarino,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid bg */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: `
              linear-gradient(rgba(108,196,212,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108,196,212,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        {/* Ambient glow orbs */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: 300,
            height: 300,
            background: 'rgba(108,196,212,0.06)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: 400,
            height: 400,
            background: 'rgba(203,230,177,0.05)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            pointerEvents: 'none',
          }}
        />

        {/* ============ MAIN GRID: LEFT TEXT + RIGHT PANEL ============ */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            width: '100%',
            maxWidth: 1280,
            margin: '0 auto',
            padding: '120px 40px 80px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* ====== LEFT: TEXT CONTENT (untouched by effect) ====== */}
          <div>
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                background: 'rgba(108,196,212,0.12)',
                border: '1px solid rgba(108,196,212,0.25)',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                color: COLORS.turquesa,
                marginBottom: '28px',
              }}
            >
              <span style={{ fontSize: '14px' }}>☆</span>
              <span>✨ Consultoría Empresarial</span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 'clamp(32px, 4.2vw, 64px)',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.08,
                marginBottom: '24px',
                letterSpacing: '-0.02em',
              }}
            >
              Consultoría
              <br />
              empresarial
              <br />
              <span style={{ color: COLORS.turquesa }}>estratégicamente</span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.65,
                maxWidth: 520,
                marginBottom: '36px',
              }}
            >
              Brindamos soluciones empresariales completas en consultoría,
              desarrollo de software e infraestructura tecnológica.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <a
                href="#contacto"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '15px 30px',
                  background: COLORS.turquesa,
                  color: COLORS.azulMarino,
                  fontWeight: 700,
                  fontSize: '14px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 20px rgba(108,196,212,0.25)',
                }}
              >
                Solicita Diagnóstico Gratuito
                <span style={{ fontSize: '16px' }}>→</span>
              </a>
              <a
                href="#servicios"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '15px 30px',
                  background: 'rgba(255,255,255,0.07)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '14px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'all 0.3s',
                }}
              >
                Conoce nuestros servicios
              </a>
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'flex',
                gap: '48px',
                paddingTop: '28px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {[
                { n: '500+', l: 'Proyectos Completados' },
                { n: '98%', l: 'Satisfacción del Cliente' },
                { n: '15+', l: 'Años de Experiencia' },
              ].map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: '28px',
                      fontWeight: 700,
                      color: COLORS.turquesa,
                      fontFamily: "'Sora', sans-serif",
                    }}
                  >
                    {s.n}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ====== RIGHT: INTERACTIVE CHAOS→ORDER PANEL ====== */}
          <div
            style={{
              position: 'relative',
              height: '100%',
              minHeight: 520,
            }}
          >
            {/* The interactive reveal zone */}
            <div
              ref={panelRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: isFullReveal ? 'default' : 'none',
              }}
            >
              {/* ---- CHAOS LAYER (base, always visible) ---- */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '24px',
                }}
              >
                {/* Chaotic grid bg */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.04,
                    backgroundImage: `
                      linear-gradient(rgba(255,100,100,0.4) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,100,100,0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '45px 45px',
                    transform: 'rotate(3deg) scale(1.1)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Tangled lines */}
                <svg
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                >
                  {CHAOS_LINES.map((l, i) => (
                    <path
                      key={i}
                      d={`M ${l.x1}% ${l.y1}% Q ${(l.x1 + l.x2) / 2}% ${(l.y1 + l.y2) / 2 + l.c}% ${l.x2}% ${l.y2}%`}
                      fill="none"
                      stroke="rgba(255, 100, 100, 0.18)"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                    />
                  ))}
                  {/* X marks */}
                  {[
                    { x: 35, y: 35 },
                    { x: 65, y: 55 },
                    { x: 50, y: 72 },
                  ].map((p, i) => (
                    <g key={i} opacity="0.25">
                      <line x1={`${p.x - 1.5}%`} y1={`${p.y - 1.5}%`} x2={`${p.x + 1.5}%`} y2={`${p.y + 1.5}%`} stroke="#ff6b6b" strokeWidth="2" />
                      <line x1={`${p.x + 1.5}%`} y1={`${p.y - 1.5}%`} x2={`${p.x - 1.5}%`} y2={`${p.y + 1.5}%`} stroke="#ff6b6b" strokeWidth="2" />
                    </g>
                  ))}
                </svg>

                {/* Chaotic nodes */}
                {NODES.map((node, i) => {
                  const p = CHAOS[i];
                  return (
                    <div
                      key={`c-${node.id}`}
                      style={{
                        position: 'absolute',
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        transform: `translate(-50%, -50%) rotate(${p.r}deg) scale(${p.s})`,
                        opacity: p.o,
                      }}
                    >
                      <div
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '10px',
                          padding: '10px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 4,
                          backdropFilter: 'blur(6px)',
                          minWidth: 78,
                        }}
                      >
                        <span style={{ fontSize: 20 }}>{node.icon}</span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.3)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {node.label}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Warning labels */}
                {[
                  { x: 50, y: 45, t: '⚠️ Sin proceso' },
                  { x: 25, y: 65, t: '❌ Retrabajos' },
                  { x: 72, y: 30, t: '⏳ Cuellos de botella' },
                ].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${w.x}%`,
                      top: `${w.y}%`,
                      transform: `translate(-50%, -50%) rotate(${-4 + i * 3}deg)`,
                      fontSize: 9,
                      color: 'rgba(255,107,107,0.35)',
                      fontWeight: 600,
                      letterSpacing: '0.3px',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                    }}
                  >
                    {w.t}
                  </div>
                ))}

                {/* "DESORDENADO" watermark */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 20,
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'rgba(255,100,100,0.15)',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    pointerEvents: 'none',
                  }}
                >
                  ● Procesos desordenados
                </div>
              </div>

              {/* ---- ORDERED LAYER (revealed) ---- */}
              <div
                ref={orderedLayerRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(160deg, ${COLORS.azulMarino}, ${COLORS.azulMarinoLight})`,
                  border: '1px solid rgba(108,196,212,0.15)',
                  borderRadius: '24px',
                  clipPath: 'circle(0px at -500px -500px)',
                  zIndex: 2,
                  willChange: 'clip-path',
                }}
              >
                {/* Clean grid bg */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.06,
                    backgroundImage: `
                      linear-gradient(rgba(108,196,212,0.6) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(108,196,212,0.6) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    pointerEvents: 'none',
                  }}
                />

                {/* Phase headers */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                  <defs>
                    <marker id="arr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                      <polygon points="0 0, 7 2.5, 0 5" fill="rgba(108,196,212,0.35)" />
                    </marker>
                  </defs>

                  {/* Phase labels */}
                  {['Fase 1', 'Fase 2', 'Fase 3'].map((ph, i) => (
                    <text
                      key={ph}
                      x={`${16 + i * 34}%`}
                      y="7%"
                      fill="rgba(108,196,212,0.4)"
                      fontSize="10"
                      fontWeight="700"
                      textAnchor="middle"
                      letterSpacing="2"
                      fontFamily="DM Sans, sans-serif"
                    >
                      {ph.toUpperCase()}
                    </text>
                  ))}

                  {/* Clean connector lines */}
                  {ORDER_LINES.map((l, i) => (
                    <line
                      key={i}
                      x1={`${l.x1}%`}
                      y1={`${l.y1}%`}
                      x2={`${l.x2}%`}
                      y2={`${l.y2}%`}
                      stroke="rgba(108,196,212,0.2)"
                      strokeWidth="1.5"
                      markerEnd="url(#arr)"
                      strokeDasharray={l.y1 !== l.y2 ? '4 3' : 'none'}
                    />
                  ))}
                </svg>

                {/* Ordered nodes */}
                {NODES.map((node, i) => {
                  const p = ORDER[i];
                  return (
                    <div
                      key={`o-${node.id}`}
                      style={{
                        position: 'absolute',
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        transform: 'translate(-50%, -50%)',
                        opacity: 1,
                      }}
                    >
                      <div
                        style={{
                          background: 'rgba(108,196,212,0.1)',
                          border: '1px solid rgba(108,196,212,0.3)',
                          borderRadius: '12px',
                          padding: '12px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 5,
                          backdropFilter: 'blur(8px)',
                          minWidth: 82,
                          boxShadow: '0 4px 16px rgba(108,196,212,0.08)',
                        }}
                      >
                        <span style={{ fontSize: 22 }}>{node.icon}</span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.85)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {node.label}
                        </span>
                        <div
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: '50%',
                            background: COLORS.turquesa,
                            opacity: 0.6,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Success indicators */}
                {[
                  { x: 25, y: 94, t: '✓ KPIs definidos' },
                  { x: 55, y: 94, t: '✓ Flujo optimizado' },
                  { x: 82, y: 94, t: '✓ Mejora continua' },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${s.x}%`,
                      top: `${s.y}%`,
                      transform: 'translate(-50%, -50%)',
                      fontSize: 9,
                      color: 'rgba(203,230,177,0.55)',
                      fontWeight: 700,
                      letterSpacing: '0.3px',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                    }}
                  >
                    {s.t}
                  </div>
                ))}

                {/* "OPTIMIZADO" watermark */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 20,
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'rgba(108,196,212,0.2)',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    pointerEvents: 'none',
                  }}
                >
                  ● Procesos optimizados
                </div>
              </div>

              {/* ---- SPOTLIGHT RING ---- */}
              {!isFullReveal && (
                <div
                  ref={spotlightRingRef}
                  style={{
                    position: 'absolute',
                    left: -500,
                    top: -500,
                    width: spotlightR * 2,
                    height: spotlightR * 2,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(108,196,212,0.2)',
                    boxShadow: '0 0 50px rgba(108,196,212,0.06), inset 0 0 50px rgba(108,196,212,0.02)',
                    pointerEvents: 'none',
                    zIndex: 10,
                    display: 'none',
                  }}
                />
              )}

              {/* ---- CUSTOM CURSOR ---- */}
              {!isFullReveal && (
                <div
                  ref={cursorDotRef}
                  style={{
                    position: 'absolute',
                    left: -500,
                    top: -500,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: COLORS.turquesa,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 11,
                    boxShadow: `0 0 12px ${COLORS.turquesa}`,
                    display: 'none',
                  }}
                />
              )}
            </div>

            {/* ====== FLOATING TOGGLE BUTTON ====== */}
            <button
              onClick={() => setIsFullReveal((prev) => !prev)}
              style={{
                position: 'absolute',
                bottom: -20,
                right: 16,
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                padding: '12px 22px',
                background: isFullReveal
                  ? 'rgba(108,196,212,0.15)'
                  : 'rgba(255,255,255,0.06)',
                border: `1.5px solid ${
                  isFullReveal ? 'rgba(108,196,212,0.45)' : 'rgba(255,255,255,0.12)'
                }`,
                borderRadius: '999px',
                color: isFullReveal ? COLORS.turquesa : 'rgba(255,255,255,0.6)',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.3px',
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isFullReveal
                  ? '0 4px 20px rgba(108,196,212,0.15)'
                  : '0 4px 16px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                if (!isFullReveal) {
                  e.currentTarget.style.borderColor = 'rgba(108,196,212,0.35)';
                  e.currentTarget.style.color = COLORS.turquesa;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                if (!isFullReveal) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                }
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isFullReveal ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                {isFullReveal ? (
                  <>
                    <path d="M3 7h4l3-4 3 4h4" />
                    <path d="M3 12h18" />
                    <path d="M3 17h4l3 4 3-4h4" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="16" y2="12" />
                    <line x1="4" y1="18" x2="12" y2="18" />
                  </>
                )}
              </svg>
              {isFullReveal ? 'Ver caos' : 'Ordenar'}
            </button>

            {/* Hover hint */}
            {!isFullReveal && !isHovering && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  pointerEvents: 'none',
                  animation: 'fade-hint 2.5s ease-in-out infinite',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(108,196,212,0.5)" strokeWidth="1.5">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M9 12h6M12 9l3 3-3 3" />
                </svg>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'rgba(108,196,212,0.45)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  Explora con el cursor
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 24,
              height: 38,
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: 999,
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 8,
            }}
          >
            <div
              style={{
                width: 3,
                height: 8,
                borderRadius: 999,
                background: COLORS.turquesa,
                animation: 'scroll-dot 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-hint {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes scroll-dot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
