import React, { useState, useEffect } from 'react';
import { ImTool } from 'imtool/lib/ImTool';
import { fromImage } from 'imtool';

import './App.scss';

import { SelectFile } from './components/SelectFile';
import { CaptureBar } from './components/CaptureBar';
import { FileDetails } from './components/FileDetails';
import { Effects } from './components/Effects';
import { ImageEffect } from './Effects';

function App() {
    const [ tool, setTool ] = useState<ImTool>();
    const [ inputURL, setInputURL ] = useState<string>();
    const [ outputURL, setOutputURL ] = useState<string>();
    const [ effects, setEffects ] = useState<ImageEffect[]>([]);

    useEffect(() => {
        if (inputURL) {
            fromImage(inputURL).then((tool) => {
                for (let imageEffect of effects) {
                    (tool[imageEffect.fn] as Function).apply(tool, imageEffect.arguments);
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
                <>
                    <SelectFile setInputURL={setInputURL} />
                    <CaptureBar setInputURL={setInputURL} />
                </>
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
