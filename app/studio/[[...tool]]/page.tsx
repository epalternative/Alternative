'use client';

/**
 * Sanity Studio corre como app aparte (React 19). No está embebido en este sitio.
 * Ejecuta desde la carpeta studio-app: npm run dev → http://localhost:3333
 */
export default function StudioPage() {
  const studioUrl = 'http://localhost:3333';
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#1a1a1a] p-8 text-white">
      <h1 className="text-2xl font-semibold">Sanity Studio</h1>
      <p className="max-w-md text-center text-gray-300">
        El Studio es una aplicación aparte. No está embebido en este sitio para no afectar la estructura ni dependencias.
      </p>
      <ol className="list-decimal space-y-2 text-left text-gray-300">
        <li>Abre una terminal y entra a la carpeta <code className="rounded bg-gray-700 px-2 py-1 font-mono text-sm">studio-app</code> (en la raíz del repo o donde la hayas creado).</li>
        <li>Ejecuta: <code className="rounded bg-gray-700 px-2 py-1 font-mono text-sm">npm run dev</code></li>
        <li>Abre en el navegador: <a href={studioUrl} className="text-cyan-400 underline hover:no-underline" target="_blank" rel="noopener noreferrer">{studioUrl}</a></li>
      </ol>
      <a
        href={studioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded bg-[#f43f5e] px-6 py-3 font-medium text-white no-underline transition hover:bg-[#e11d48]"
      >
        Abrir Studio (localhost:3333)
      </a>
    </div>
  );
}
