import React from "react";

import { ImageEffect } from "../Effects";
import { EffectBar } from "./EffectBar";
import { Effect } from "./Effect";
import { AnimatePresence } from "framer-motion";

export interface EffectBarProps {
  setEffects: React.Dispatch<React.SetStateAction<ImageEffect[]>>;
  effects: ImageEffect[];
  effectErrors: { [k: string]: string };
}

export const Effects: React.FC<EffectBarProps> = ({
  setEffects,
  effects,
  effectErrors,
}) => (
  <div className="effects">
    <AnimatePresence>
      {effects.map((effect) => (
        <Effect
          imageEffect={effect}
          setEffects={setEffects}
          key={effect.id}
          error={effectErrors[effect.id]}
        />
      ))}
    </AnimatePresence>
    <AnimatePresence>
      <EffectBar setEffects={setEffects} />
    </AnimatePresence>
  </div>
);
