import React from 'react';

import { ImageEffect } from '../Effects';
import { EffectBar } from './EffectBar';
import { Effect } from './Effect';

export interface EffectBarProps {
    setEffects: React.Dispatch<React.SetStateAction<ImageEffect[]>>,
    effects: ImageEffect[],
};

export const Effects: React.FC<EffectBarProps> = ({ setEffects, effects }) => (
    <div className="effects">
        { effects.map(effect =>
            <Effect imageEffect={effect} setEffects={setEffects} key={effect.id} />
        ) }
        <EffectBar setEffects={setEffects} />
    </div>
);
