import React from 'react';

import { effects, Effect, ImageEffect } from '../Effects';
import { EffectBar } from './EffectBar';

export interface EffectBarProps {
    setEffects: React.Dispatch<React.SetStateAction<ImageEffect[]>>,
    effects: ImageEffect[],
};

export const Effects: React.FC<EffectBarProps> = ({ setEffects }) => {

    return (
        <div className="effects">
            <EffectBar setEffects={setEffects} />
        </div>
    );
}
