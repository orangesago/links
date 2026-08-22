import type { Metadata } from 'next';

export type SiteProfile = 'hsi' | 'sago';

export const siteProfile: SiteProfile =
    process.env.SITE_PROFILE === 'sago' ? 'sago' : 'hsi';

export const siteUrl =
    siteProfile === 'sago'
        ? 'https://links.sagocream.com'
        : 'https://links.hsichen.dev';

const sagoSiteTitle = 'Sago Cream | Links';
const sagoSiteDescription =
    'Art, music, gaming, and social links for Sago Cream.';

export const sagoMetadata: Metadata = {
    metadataBase: new URL('https://links.sagocream.com'),
    title: {
        absolute: sagoSiteTitle,
    },
    description: sagoSiteDescription,
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: sagoSiteTitle,
        description: sagoSiteDescription,
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
        title: sagoSiteTitle,
        description: sagoSiteDescription,
        images: ['/profile/sago.jpg'],
    },
    icons: {
        icon: [{ url: '/profile/sago.jpg', type: 'image/jpeg' }],
    },
};
