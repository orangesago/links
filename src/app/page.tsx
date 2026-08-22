import type { JSX } from 'react';
import type { Metadata } from 'next';

import { App } from '@/components/App';
import { sagoMetadata, siteProfile } from '@/constants/site';

export const metadata: Metadata = siteProfile === 'sago' ? sagoMetadata : {};

export default function HomePage(): JSX.Element {
    return <App profile={siteProfile} />;
}
