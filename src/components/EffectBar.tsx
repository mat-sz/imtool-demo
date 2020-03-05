import React from 'react';

import { effects, Effect, ImageEffect } from '../Effects';
import { v4 as uuid } from 'uuid';

export interface EffectBarProps {
    setEffects: React.Dispatch<React.SetStateAction<ImageEffect[]>>
};

export const EffectBar: React.FC<EffectBarProps> = ({ setEffects }) => {
    const EffectButton: React.FC<{ effect: Effect, i: number }> = ({ effect, i }) => {
        const onClick = () => {
            setEffects(effects => [...effects, {
                id: uuid(),
                type: i,
                arguments: null
            }]);
        };

        return (
            <button onClick={onClick}>{ effect.name }</button>
        )
    };

    return (
        <div className="button-bar">
            { effects.map((effect, i) => <EffectButton effect={effect} i={i} key={i} />) }
        </div>
    );
}