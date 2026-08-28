import type { Metadata } from 'next';

export type SiteProfile = 'hsi' | 'sago';

export const siteProfile: SiteProfile =
    process.env.SITE_PROFILE === 'sago' ? 'sago' : 'hsi';

export const siteUrl =
    siteProfile === 'sago'
        ? 'https://sagocream.com/links'
        : 'https://hsichen.dev/links';

const sagoSiteTitle = 'Sago Cream | Links';
const sagoSiteDescription =
    'Art, music, gaming, and social links for Sago Cream.';

export const sagoMetadata: Metadata = {
    metadataBase: new URL('https://sagocream.com/links/'),
    title: {
        absolute: sagoSiteTitle,
    },
    description: sagoSiteDescription,
    alternates: {
        canonical: siteUrl,
    },
    openGraph: {
        title: sagoSiteTitle,
        description: sagoSiteDescription,
        url: siteUrl,
        siteName: 'Sago Cream Links',
        images: [
            {
                url: `${siteUrl}/profile/sago.jpg`,
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
        images: [`${siteUrl}/profile/sago.jpg`],
    },
    icons: {
        icon: [{ url: `${siteUrl}/profile/sago.jpg`, type: 'image/jpeg' }],
    },
};
