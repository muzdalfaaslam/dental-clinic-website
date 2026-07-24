import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import { themeToCss } from '@/config/theme';
import { meta } from '@/config/content';
import { GA_ID, META_PIXEL_ID } from '@/lib/analytics';

/**
 * Self-hosted via next/font (no third-party request, no layout shift, display:swap).
 * Only two families are ever loaded — Manrope (display: clean, modern, professional —
 * trustworthy for a B2B software pitch, without the overly rounded/bubbly feel) + Inter
 * (body/UI, keeps the clean/clinical trust factor). Brief §4.2, §10.
 */
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/' },
  robots: meta.indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: siteUrl,
    siteName: 'TechxServe Med Spa Websites',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/images/og.svg', width: 1200, height: 630, alt: meta.ogImageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: ['/images/og.svg'],
  },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#F1F2F4',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        {/* Brand tokens injected once from config/theme.ts — single source of truth. */}
        <style dangerouslySetInnerHTML={{ __html: themeToCss() }} />
      </head>
      <body>
        {children}

        {/* Analytics — afterInteractive so tags never block LCP (brief §9). */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}