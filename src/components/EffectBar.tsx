import React from 'react';
import { v4 as uuid } from 'uuid';
import { motion } from 'framer-motion';

import { effects, Effect, ImageEffect } from '../Effects';
import { animationProps } from '../animationSettings';

export interface EffectBarProps {
    setEffects: React.Dispatch<React.SetStateAction<ImageEffect[]>>
};

export const EffectBar: React.FC<EffectBarProps> = ({ setEffects }) => {
    const EffectButton: React.FC<{ effect: Effect }> = ({ effect }) => {
        const onClick = () => {
            setEffects(effects => [...effects, {
                id: uuid(),
                fn: effect.fn,
                arguments: effect.arguments ? effect.arguments.map((argument) => argument.defaultValue) : []
            }]);
        };

        return (
            <button onClick={onClick}>{ effect.name }</button>
        )
    };

    return (
        <motion.section {...animationProps} className="button-bar">
            { effects.map((effect, i) => <EffectButton effect={effect} key={i} />) }
        </motion.section>
    );
}
