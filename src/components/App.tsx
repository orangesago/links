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
        href: 'https://github.com/Hsiii',
        logoAlt: 'GitHub',
        logoSrc: '/svgl/github.svg',
        toneClass: 'social-link--github',
    },
    {
        label: 'Twitter',
        href: 'https://x.com/OrangeSago',
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

const webProfileUrls = socialLinks
    .map(({ href }) => href)
    .filter((href) => href.startsWith('https://'));

const profileStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    'mainEntity': {
        '@type': 'Person',
        'name': 'Hsi Chen',
        'alternateName': ['Hsiii', 'ccc_hsi', 'OrangeSagoCream', 'sagocream'],
        'description': 'Design-focused software developer.',
        'image': 'https://links.hsichen.dev/profile/hsi.png',
        'url': 'https://links.hsichen.dev',
        'sameAs': webProfileUrls,
    },
} as const;

const profileStructuredDataJson = JSON.stringify(
    profileStructuredData
).replaceAll('<', String.raw`\u003c`);

export function App(): JSX.Element {
    return (
        <>
            <script
                dangerouslySetInnerHTML={{ __html: profileStructuredDataJson }}
                type='application/ld+json'
            />
            <main className='app'>
                <ShaderBackground />
                <div className='linktree'>
                    <QRCodeDialog />
                    <header className='identity identity--hsi'>
                        <Image
                            alt='Hsi Chen'
                            className='identity-card__avatar'
                            height={104}
                            priority
                            src='/profile/hsi.png'
                            width={104}
                        />
                        <h1 className='identity-card__title'>Hsi Chen</h1>
                        <p className='identity-card__description'>
                            Design-focused software developer.
                        </p>
                    </header>

                    <nav aria-label='Social links' className='social-list'>
                        {socialLinks.map(
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

                    <footer className='identity identity--sago'>
                        <p className='identity-card__description'>
                            My creative side for art, music, and games.
                        </p>
                        <h2 className='identity-card__title'>
                            Orange Sago Cream
                        </h2>
                        <Image
                            alt='Orange Sago Cream'
                            className='identity-card__avatar'
                            height={104}
                            src='/profile/sago.png'
                            width={104}
                        />
                    </footer>
                </div>
            </main>
        </>
    );
}
