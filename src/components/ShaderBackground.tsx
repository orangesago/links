'use client';

import type { JSX } from 'react';
import { GrainGradient } from '@paper-design/shaders-react';

const shaderColors = {
    beige: '#f7f4ee',
    teal: '#8ed8f4',
} as const;

export function ShaderBackground(): JSX.Element {
    return (
        <GrainGradient
            aria-hidden
            className='shader-background'
            colorBack={shaderColors.beige}
            colors={[shaderColors.beige, shaderColors.teal]}
            fit='cover'
            intensity={0.3}
            maxPixelCount={1_200_000}
            noise={0.25}
            scale={1}
            shape='wave'
            softness={0.25}
            speed={1}
        />
    );
}
