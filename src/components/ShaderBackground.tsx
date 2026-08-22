'use client';

import type { JSX } from 'react';
import { GrainGradient, MeshGradient } from '@paper-design/shaders-react';

interface ShaderBackgroundProps {
    readonly variant?: 'hsi' | 'sago';
}

const shaderColors = {
    beige: '#f7f4ee',
    teal: '#8ed8f4',
} as const;

export function ShaderBackground({
    variant = 'hsi',
}: ShaderBackgroundProps): JSX.Element {
    if (variant === 'sago') {
        return (
            <MeshGradient
                aria-hidden
                className='shader-background'
                colors={['#966fce', '#6abdcd']}
                distortion={0.6}
                grainMixer={0}
                grainOverlay={0}
                height={720}
                speed={0.4}
                style={{ height: '100%', width: '100%' }}
                swirl={0.12}
                width={1280}
            />
        );
    }

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
