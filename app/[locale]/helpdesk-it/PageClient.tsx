'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Loader2, Paperclip, Send } from 'lucide-react';

const MAX_FILE_SIZE_MB = 10;
const MAX_FILES = 5;

export default function HelpdeskItPage() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/helpdesk', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(
          typeof data?.error === 'string' ? data.error : 'No se pudo enviar el formulario. Intenta de nuevo.'
        );
        return;
      }

      setStatus('success');
      form.reset();
      setFiles([]);
    } catch {
      setStatus('error');
      setErrorMessage('Error de conexión. Verifica tu red e intenta de nuevo.');
    }
  }

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list?.length) {
      setFiles([]);
      return;
    }
    const arr = Array.from(list).slice(0, MAX_FILES);
    const oversized = arr.filter((f) => f.size > MAX_FILE_SIZE_MB * 1024 * 1024);
    if (oversized.length) {
      setErrorMessage(
        `Algunos archivos superan ${MAX_FILE_SIZE_MB} MB y no se adjuntarán. Máximo ${MAX_FILES} archivos.`
      );
    }
    setFiles(arr.filter((f) => f.size <= MAX_FILE_SIZE_MB * 1024 * 1024));
  }

  return (
    <div className="min-h-screen bg-blanco-hueso relative">
      {/* Fondo cuadriculado violeta mínimamente visible */}
      <div className="absolute inset-0 pointer-events-none bg-grid-violet-subtle" />
      <div className="container-custom py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Sección izquierda: logo, título y mensaje (alineada al centro del formulario) */}
          <header className="lg:py-8">
            <Image
              src="/logo_alternative_horizontal.webp"
              alt="Alternative"
              width={200}
              height={56}
              className="h-14 w-auto object-contain flex-shrink-0 mb-6"
              priority
            />
            <h1 className="text-3xl md:text-4xl lg:text-display-sm font-semibold text-azul-marino mb-5">
              {isEs ? 'Helpdesk IT – Alternative' : 'IT Helpdesk – Alternative'}
            </h1>
            <div className="space-y-4 text-body-lg text-azul-marino/80 max-w-xl">
              <p>
                {isEs
                  ? 'Por favor, completa el siguiente formulario para reportar cualquier incidencia, solicitud de soporte o requerimiento técnico relacionado con los servicios contratados.'
                  : 'Please complete the form below to report any incident, support request or technical requirement related to your contracted services.'}
              </p>
              <p>
                {isEs
                  ? 'Te recomendamos incluir una descripción clara del caso, así como cualquier documento o captura de pantalla que facilite el análisis. Nuestro equipo técnico recibirá tu solicitud y dará seguimiento vía correo electrónico dentro del tiempo de atención establecido en el acuerdo de servicio.'
                  : 'We recommend including a clear description of the case, along with any document or screenshot that helps the analysis. Our technical team will receive your request and follow up by email within the response time set in the service agreement.'}
              </p>
            </div>
          </header>

          {/* Sección derecha: formulario */}
          <section
            className={cn(
              'relative bg-white rounded-2xl p-6 md:p-8 lg:p-10 lg:pb-12 shadow-brand',
              'transition-all duration-300'
            )}
          >
          {status === 'success' && (
            <div className="mb-6 p-4 rounded-xl bg-menta/20 border border-oliva/20 text-azul-marino">
              <p className="font-medium">Solicitud enviada correctamente.</p>
              <p className="text-body-sm mt-1">
                Recibirás confirmación por correo electrónico. Nuestro equipo dará seguimiento en el tiempo
                establecido.
              </p>
            </div>
          )}

          {status === 'error' && errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-body-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombreCompleto" className="text-azul-marino font-medium">
                  Nombre completo
                </Label>
                <Input
                  id="nombreCompleto"
                  name="nombreCompleto"
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  className="rounded-lg border-gris-arena/30 bg-white focus-visible:ring-turquesa"
                  disabled={status === 'loading'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-azul-marino font-medium">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  className="rounded-lg border-gris-arena/30 bg-white focus-visible:ring-turquesa"
                  disabled={status === 'loading'}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="numeroContacto" className="text-azul-marino font-medium">
                  Número de contacto
                </Label>
                <Input
                  id="numeroContacto"
                  name="numeroContacto"
                  type="tel"
                  placeholder="+507 6000-0000"
                  className="rounded-lg border-gris-arena/30 bg-white focus-visible:ring-turquesa"
                  disabled={status === 'loading'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="asunto" className="text-azul-marino font-medium">
                  Asunto
                </Label>
                <Input
                  id="asunto"
                  name="asunto"
                  type="text"
                  required
                  placeholder="Resumen del caso o solicitud"
                  className="rounded-lg border-gris-arena/30 bg-white focus-visible:ring-turquesa"
                  disabled={status === 'loading'}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion" className="text-azul-marino font-medium">
                Descripción del caso
              </Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                required
                rows={5}
                placeholder="Describe con detalle la incidencia, solicitud o requerimiento técnico..."
                className="rounded-lg border-gris-arena/30 bg-white focus-visible:ring-turquesa min-h-[120px]"
                disabled={status === 'loading'}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-azul-marino font-medium flex items-center gap-2">
                <Paperclip className="w-4 h-4" />
                Adjuntar archivos (opcional)
              </Label>
              <p className="text-body-sm text-azul-marino/70">
                Máximo {MAX_FILES} archivos, {MAX_FILE_SIZE_MB} MB cada uno. Cualquier tipo de archivo.
              </p>
              <div className="pt-2">
                <Input
                  name="adjuntos"
                  type="file"
                  multiple
                  accept="*/*"
                  onChange={onFilesChange}
                  className="input-file-spaced rounded-lg border-gris-arena/30 bg-white file:rounded-lg file:border-0 file:bg-turquesa/20 file:px-4 file:text-azul-marino file:text-sm file:font-medium focus-visible:ring-turquesa"
                  disabled={status === 'loading'}
                />
              </div>
              {files.length > 0 && (
                <ul className="text-body-sm text-azul-marino/70 mt-2 space-y-1">
                  {files.map((f, i) => (
                    <li key={i}>
                      {f.name} ({(f.size / 1024).toFixed(1)} KB)
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-4 pb-6">
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                disabled={status === 'loading'}
                className="bg-turquesa text-azul-marino hover:bg-menta transition-all duration-300 shadow-glow-turquesa w-full sm:w-auto"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar solicitud
                  </>
                )}
              </Button>
            </div>
          </form>
        </section>
        </div>
      </div>
    </div>
  );
}
