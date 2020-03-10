import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { motion } from 'framer-motion';
import { ImTool } from 'imtool/lib/ImTool';

import { animationProps } from '../animationSettings';
import { ImageEffect } from '../Effects';

export interface FileDetailsProps {
    tool?: ImTool,
    inputURL?: string,
    outputURL?: string,
    effects?: ImageEffect[],
    source: string,
};

export const FileDetails: React.FC<FileDetailsProps> = ({ tool, effects, inputURL, outputURL, source }) => {
    const [ lightboxSrc, setLightboxSrc ] = useState<string>();
    const [ lightboxTitle, setLightboxTitle ] = useState<string>('Input image');

    const closeLightbox = () => setLightboxSrc(undefined);
    const openOutput = () => {
        setLightboxTitle('Output image');
        setLightboxSrc(outputURL);
    };
    const openInput = () => {
        setLightboxTitle('Input image');
        setLightboxSrc(inputURL);  
    };

    if (!tool || !inputURL) return null;

    let text: string | undefined;
    if (effects) {
        const sourceFunction = source === 'fromImage' ? 'fromImage(\'image.png\')' : source + '()';
        text = 'import { ' + source + ' } from \'imtool\';\n\nasync function demo() {\n    const tool = await ' + sourceFunction + ';\n    await tool';
        for (let effect of effects) {
            text += '.' + effect.fn + '(' + (effect.arguments.reduce((prev, value) => prev === '' ? value : prev + ', ' + value, '')) + ')';
        }
        text += '.toDataURL();\n}';
    }

    return (
        <motion.section {...animationProps} className="details">
            { lightboxSrc ?
            <Lightbox
                mainSrc={lightboxSrc}
                onCloseRequest={closeLightbox}
                imageTitle={lightboxTitle}
            />
            : null }
            <div className="preview">
                <div>Input:</div>
                <img src={inputURL} alt="Input" onClick={openInput} />
                <div>{ tool.originalWidth }x{ tool.originalHeight }</div>
            </div>
            { outputURL ? (
                <>
                    <div className="arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M0 304v-96c0-13.3 10.7-24 24-24h200V80.2c0-21.4 25.8-32.1 41-17L441 239c9.4 9.4 9.4 24.6 0 34L265 448.7c-15.1 15.1-41 4.4-41-17V328H24c-13.3 0-24-10.7-24-24z"/>
                        </svg>
                    </div>
                    <div className="preview">
                        <div>Output:</div>
                        <img src={outputURL} alt="Output" onClick={openOutput} />
                        <div>{ tool.width }x{ tool.height }</div>
                    </div>
                </>
            ) : null }
            { text ? (
                <pre>
                    { text }
                </pre>
            ) : null }
        </motion.section>
    );
}
