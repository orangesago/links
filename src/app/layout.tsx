import type { JSX, ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';

import './global.css';

const siteUrl = new URL('https://hsichen.dev/links/');
const siteTitle = 'Hsi Chen | Links';
const siteDescription =
    'Links to Hsi Chen on GitHub, LinkedIn, Instagram, Threads, and other social profiles.';
const previewImage = {
    url: 'https://hsichen.dev/links/og.png',
    width: 1200,
    height: 630,
    alt: 'Hsi Chen links preview',
} as const;

export const metadata: Metadata = {
    metadataBase: siteUrl,
    title: {
        default: siteTitle,
        template: '%s | Hsi Chen',
    },
    description: siteDescription,
    alternates: {
        canonical: 'https://hsichen.dev/links',
    },
    openGraph: {
        title: siteTitle,
        description: siteDescription,
        url: 'https://hsichen.dev/links',
        siteName: 'Hsi Chen Links',
        images: [previewImage],
        type: 'profile',
    },
    twitter: {
        card: 'summary_large_image',
        title: siteTitle,
        description: siteDescription,
        images: [previewImage],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            'index': true,
            'follow': true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    icons: {
        icon: [
            { url: '/links/favicon.svg', type: 'image/svg+xml' },
            { url: '/links/favicon.png', sizes: '256x256', type: 'image/png' },
        ],
    },
    verification: {
        google: 'U0MZAhyxx3hG4euT-pHfkimkVmT8oOu0dAlgD0OFoaQ',
    },
};

interface RootLayoutProps {
    readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
    return (
        <html lang='en'>
            <body>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
