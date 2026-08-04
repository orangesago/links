import type { JSX } from 'react';
import { connection } from 'next/server';

import { App } from '@/components/App';
import { getSocialLinks } from '@/data/social-links';

export default async function HomePage(): Promise<JSX.Element> {
    await connection();

    return <App socialLinks={await getSocialLinks()} />;
}
