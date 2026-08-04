import { get } from '@vercel/edge-config';
import { isArray } from 'complete-common';

export interface SocialLink {
    readonly label: string;
    readonly href: string;
    readonly logoSrc: string;
    readonly toneClass: string;
}

export const defaultSocialLinks: readonly SocialLink[] = [
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=100011113621038',
        logoSrc: '/svgl/facebook.svg',
        toneClass: 'social-link--facebook',
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/ccc_hsi/',
        logoSrc: '/svgl/instagram.svg',
        toneClass: 'social-link--instagram',
    },
    {
        label: 'Threads',
        href: 'https://www.threads.com/@ccc_hsi',
        logoSrc: '/svgl/threads.svg',
        toneClass: 'social-link--threads',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/its-hsi-chen/',
        logoSrc: '/svgl/linkedin.svg',
        toneClass: 'social-link--linkedin',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/Hsiii',
        logoSrc: '/svgl/github.svg',
        toneClass: 'social-link--github',
    },
    {
        label: 'Twitter',
        href: 'https://x.com/OrangeSagoCream',
        logoSrc: '/svgl/x.svg',
        toneClass: 'social-link--twitter',
    },
    {
        label: 'Pixiv',
        href: 'https://www.pixiv.net/users/64764125',
        logoSrc: '/svgl/pixiv.jpeg',
        toneClass: 'social-link--pixiv',
    },
    {
        label: 'Discord',
        href: 'discord://-/users/917446775873343600',
        logoSrc: '/svgl/discord.svg',
        toneClass: 'social-link--discord',
    },
    {
        label: 'Spotify',
        href: 'https://open.spotify.com/user/31bturepoosptp5xv2vln3nqz7ca',
        logoSrc: '/svgl/spotify.svg',
        toneClass: 'social-link--spotify',
    },
    {
        label: 'Steam',
        href: 'https://steamcommunity.com/id/sagocream/',
        logoSrc: '/svgl/steam.svg',
        toneClass: 'social-link--steam',
    },
    {
        label: 'TETR.IO',
        href: 'https://ch.tetr.io/u/sagocream',
        logoSrc: '/svgl/tetrio.svg',
        toneClass: 'social-link--tetrio',
    },
];

function isSocialLink(value: unknown): value is SocialLink {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const link = value as Record<string, unknown>;

    return (
        typeof link.label === 'string' &&
        typeof link.href === 'string' &&
        typeof link.logoSrc === 'string' &&
        typeof link.toneClass === 'string'
    );
}

function isSocialLinks(value: unknown): value is readonly SocialLink[] {
    return isArray(value) && value.length > 0 && value.every(isSocialLink);
}

export async function getSocialLinks(): Promise<readonly SocialLink[]> {
    const edgeConfig = process.env.EDGE_CONFIG;

    if (edgeConfig === undefined || edgeConfig === '') {
        return defaultSocialLinks;
    }

    try {
        const socialLinks = await get('socialLinks');

        if (isSocialLinks(socialLinks)) {
            return socialLinks;
        }

        console.error('Edge Config socialLinks is missing or invalid.');
    } catch (error) {
        console.error('Unable to read socialLinks from Edge Config.', error);
    }

    return defaultSocialLinks;
}
