import { ImageResponse } from 'next/og';

export const alt = 'Alternative - Consultoría Empresarial';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://grupoalternative.com';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#132d54',
          padding: 80,
        }}
      >
        {/* Logo centrado con padding para que no se recorte en ninguna plataforma */}
        <img
          src={`${SITE_URL}/logo_alternative_horizontal.webp`}
          alt="Alternative"
          style={{
            maxWidth: '85%',
            maxHeight: '70%',
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
