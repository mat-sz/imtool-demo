import React from 'react';

import { ImageEffect, effects as effectsArray } from '../Effects';
import { EffectBar } from './EffectBar';

export interface EffectBarProps {
    setEffects: React.Dispatch<React.SetStateAction<ImageEffect[]>>,
    effects: ImageEffect[],
};

export const Effects: React.FC<EffectBarProps> = ({ setEffects, effects }) => {
    const Effect: React.FC<{ imageEffect: ImageEffect }> = ({ imageEffect }) => {
        const onClick = () => {
            setEffects(effects => effects.filter(effect => effect.id !== imageEffect.id));
        };

        const effect = effectsArray.find((effect) => effect.fn === imageEffect.fn);

        return (
            <div className="effect">
                <h3>{ effect?.name ?? 'Unknown' }</h3>
                <button onClick={onClick}>Remove</button>
            </div>
        )
    };

    return (
        <div className="effects">
            { effects.map(effect => <Effect imageEffect={effect} key={effect.id} />) }
            <EffectBar setEffects={setEffects} />
        </div>
    );
}
