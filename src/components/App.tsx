import type { JSX } from 'react';
import Image from 'next/image';

import { QRCodeDialog } from '@/components/QRCodeDialog';
import { ShaderBackground } from '@/components/ShaderBackground';
import type { SocialLink } from '@/data/social-links';

interface AppProps {
    readonly socialLinks: readonly SocialLink[];
}

export function App({ socialLinks }: AppProps): JSX.Element {
    const webProfileUrls = socialLinks
        .map(({ href }) => href)
        .filter((href) => href.startsWith('https://'));
    const profileStructuredDataJson = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        'mainEntity': {
            '@type': 'Person',
            'name': 'Hsi Chen',
            'alternateName': [
                'Hsiii',
                'ccc_hsi',
                'OrangeSagoCream',
                'sagocream',
            ],
            'description': 'Design-focused software developer.',
            'image': 'https://links.hsichen.dev/profile/hsi.png',
            'url': 'https://links.hsichen.dev',
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
                            ({ label, href, logoSrc, toneClass }) => (
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
                                            alt={label}
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
