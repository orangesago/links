import type { JSX } from 'react';
import Image from 'next/image';

import { QRCodeDialog } from '@/components/QRCodeDialog';
import { ShaderBackground } from '@/components/ShaderBackground';

interface SocialLink {
    readonly label: string;
    readonly href: string;
    readonly logoAlt: string;
    readonly logoSrc: string;
    readonly toneClass: string;
}

type Profile = 'hsi' | 'sago';

interface AppProps {
    readonly profile?: Profile;
}

const socialLinks: readonly SocialLink[] = [
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=100011113621038',
        logoAlt: 'Facebook',
        logoSrc: '/svgl/facebook.svg',
        toneClass: 'social-link--facebook',
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/ccc_hsi/',
        logoAlt: 'Instagram',
        logoSrc: '/svgl/instagram.svg',
        toneClass: 'social-link--instagram',
    },
    {
        label: 'Threads',
        href: 'https://www.threads.com/@ccc_hsi',
        logoAlt: 'Threads',
        logoSrc: '/svgl/threads.svg',
        toneClass: 'social-link--threads',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/its-hsi-chen/',
        logoAlt: 'LinkedIn',
        logoSrc: '/svgl/linkedin.svg',
        toneClass: 'social-link--linkedin',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/sago-cream',
        logoAlt: 'GitHub',
        logoSrc: '/svgl/github.svg',
        toneClass: 'social-link--github',
    },
    {
        label: 'Twitter',
        href: 'https://x.com/orangesago',
        logoAlt: 'Twitter',
        logoSrc: '/svgl/x.svg',
        toneClass: 'social-link--twitter',
    },
    {
        label: 'Pixiv',
        href: 'https://www.pixiv.net/users/64764125',
        logoAlt: 'Pixiv',
        logoSrc: '/svgl/pixiv.jpeg',
        toneClass: 'social-link--pixiv',
    },
    {
        label: 'Discord',
        href: 'discord://-/users/917446775873343600',
        logoAlt: 'Discord',
        logoSrc: '/svgl/discord.svg',
        toneClass: 'social-link--discord',
    },
    {
        label: 'Spotify',
        href: 'https://open.spotify.com/user/31bturepoosptp5xv2vln3nqz7ca',
        logoAlt: 'Spotify',
        logoSrc: '/svgl/spotify.svg',
        toneClass: 'social-link--spotify',
    },
    {
        label: 'Steam',
        href: 'https://steamcommunity.com/id/sagocream/',
        logoAlt: 'Steam',
        logoSrc: '/svgl/steam.svg',
        toneClass: 'social-link--steam',
    },
    {
        label: 'TETR.IO',
        href: 'https://ch.tetr.io/u/sagocream',
        logoAlt: 'TETR.IO',
        logoSrc: '/svgl/tetrio.svg',
        toneClass: 'social-link--tetrio',
    },
];

const sagoLinkLabels = new Set([
    'Discord',
    'GitHub',
    'Pixiv',
    'Spotify',
    'Steam',
    'TETR.IO',
    'Twitter',
]);

const profiles = {
    hsi: {
        name: 'Hsi Chen',
        alternateNames: [
            'orangesago',
            'Hsiii',
            'ccc_hsi',
            'OrangeSagoCream',
            'sagocream',
        ],
        description: 'Design-focused software developer.',
        imagePath: '/profile/hsi.png',
        siteUrl: 'https://links.hsichen.dev',
    },
    sago: {
        name: 'Sago Cream',
        alternateNames: ['orangesago', 'OrangeSagoCream', 'sagocream'],
        description: 'Art, music, and games.',
        imagePath: '/profile/sago.jpg',
        siteUrl: 'https://links.sagocream.com',
    },
} as const;

export function App({ profile = 'hsi' }: AppProps): JSX.Element {
    const identity = profiles[profile];
    const isSago = profile === 'sago';
    const sagoSocialLinks = socialLinks.filter(({ label }) =>
        sagoLinkLabels.has(label)
    );
    const visibleSocialLinks = isSago
        ? [
              ...sagoSocialLinks.filter(({ label }) => label !== 'GitHub'),
              ...sagoSocialLinks.filter(({ label }) => label === 'GitHub'),
          ]
        : socialLinks;
    const webProfileUrls = visibleSocialLinks
        .map(({ href }) => href)
        .filter((href) => href.startsWith('https://'));
    const profileStructuredDataJson = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        'mainEntity': {
            '@type': 'Person',
            'name': identity.name,
            'alternateName': identity.alternateNames,
            'description': identity.description,
            'image': `${identity.siteUrl}${identity.imagePath}`,
            'url': identity.siteUrl,
            'sameAs': webProfileUrls,
        },
    }).replaceAll('<', String.raw`\u003c`);

    return (
        <>
            <script
                dangerouslySetInnerHTML={{ __html: profileStructuredDataJson }}
                type='application/ld+json'
            />
            <main className='app'>
                <ShaderBackground />
                <div className='linktree'>
                    <QRCodeDialog siteUrl={identity.siteUrl} />
                    <header
                        className={`identity identity--primary${isSago ? ' identity--sago-primary' : ''}`}
                    >
                        <Image
                            alt={identity.name}
                            className='identity-card__avatar'
                            height={104}
                            priority
                            src={identity.imagePath}
                            width={104}
                        />
                        <h1 className='identity-card__title'>
                            {identity.name}
                        </h1>
                        <p className='identity-card__description'>
                            {identity.description}
                        </p>
                    </header>

                    <nav aria-label='Social links' className='social-list'>
                        {visibleSocialLinks.map(
                            ({ label, href, logoAlt, logoSrc, toneClass }) => (
                                <a
                                    className={`social-link ${toneClass}`}
                                    href={href}
                                    key={label}
                                    rel='noreferrer noopener'
                                    target='_blank'
                                >
                                    <span
                                        aria-hidden
                                        className='social-link__icon'
                                    >
                                        <Image
                                            alt={logoAlt}
                                            className='social-link__logo'
                                            height={28}
                                            src={logoSrc}
                                            width={28}
                                        />
                                    </span>
                                    <span className='social-link__copy'>
                                        <span className='social-link__label'>
                                            {label}
                                        </span>
                                    </span>
                                </a>
                            )
                        )}
                    </nav>

                    {!isSago && (
                        <footer className='identity identity--sago'>
                            <p className='identity-card__description'>
                                My creative side for art, music, and games.
                            </p>
                            <h2 className='identity-card__title'>Sago Cream</h2>
                            <Image
                                alt='Sago Cream'
                                className='identity-card__avatar'
                                height={104}
                                src='/profile/sago.jpg'
                                width={104}
                            />
                        </footer>
                    )}
                </div>
            </main>
        </>
    );
}
