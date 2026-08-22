import type { JSX } from 'react';

import { App } from '@/components/App';

export { sagoMetadata as metadata } from '@/constants/site';

export default function SagoPage(): JSX.Element {
    return <App profile='sago' />;
}
