import type { JSX } from 'react';
import type { Metadata } from 'next';

import { App } from '@/components/App';

const siteTitle = 'Sago Cream | Links';
const siteDescription = 'Art, music, gaming, and social links for Sago Cream.';

export const metadata: Metadata = {
    metadataBase: new URL('https://links.sagocream.com'),
    title: {
        absolute: siteTitle,
    },
    description: siteDescription,
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: siteTitle,
        description: siteDescription,
        url: '/',
        siteName: 'Sago Cream Links',
        images: [
            {
                url: '/profile/sago.jpg',
                width: 1540,
                height: 1540,
                alt: 'Sago Cream',
            },
        ],
        type: 'profile',
    },
    twitter: {
        card: 'summary',
        title: siteTitle,
        description: siteDescription,
        images: ['/profile/sago.jpg'],
    },
    icons: {
        icon: [{ url: '/profile/sago.jpg', type: 'image/jpeg' }],
    },
};

export default function SagoPage(): JSX.Element {
    return <App profile='sago' />;
}
