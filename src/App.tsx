import React, { useState, useEffect } from 'react';
import { ImTool } from 'imtool/lib/ImTool';
import { fromImage } from 'imtool';

import './App.scss';
import { SelectFile } from './components/SelectFile';
import { FileDetails } from './components/FileDetails';
import { Effects } from './components/Effects';
import { ImageEffect, EffectType } from './Effects';

function App() {
    const [ file, setFile ] = useState<File>();
    const [ tool, setTool ] = useState<ImTool>();
    const [ inputURL, setInputURL ] = useState<string>();
    const [ outputURL, setOutputURL ] = useState<string>();
    const [ effects, setEffects ] = useState<ImageEffect[]>([]);

    useEffect(() => {
        if (file) {
            fromImage(file).then(
                tool => tool.toDataURL().then(url => setInputURL(url))
            );
        }
    }, [ file ]);

    useEffect(() => {
        if (inputURL) {
            fromImage(inputURL).then((tool) => {
                for (let imageEffect of effects) {
                    switch (imageEffect.type) {
                        case EffectType.FLIP_H:
                            tool = tool.flipH();
                            break;
                        case EffectType.FLIP_V:
                            tool = tool.flipV();
                            break;
                        case EffectType.SCALE:
                            tool = tool.scale(100, 100);
                            break;
                        case EffectType.THUMBNAIL:
                            tool = tool.thumbnail(100, false);
                            break;
                        case EffectType.CROP:
                            tool = tool.crop(10, 10, 20, 20);
                            break;
                    }
                }

                tool.toDataURL().then((url) => {
                    setTool(tool);
                    setOutputURL(url);
                });
            });
        }
    }, [ inputURL, effects ]);

    return (
        <div className="App">
            <h1>imtool</h1>
            { !tool ?
                <SelectFile onFile={setFile} />
            :
                <>
                    <FileDetails tool={tool} inputURL={inputURL} outputURL={outputURL} />
                    <Effects setEffects={setEffects} effects={effects} />
                </>
            }
        </div>
    );
}

export default App;
