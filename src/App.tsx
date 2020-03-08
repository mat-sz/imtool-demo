import React, { useState, useEffect } from 'react';
import { ImTool } from 'imtool/lib/ImTool';
import { fromImage } from 'imtool';

import './App.scss';

import { SelectFile } from './components/SelectFile';
import { CaptureBar } from './components/CaptureBar';
import { FileDetails } from './components/FileDetails';
import { Effects } from './components/Effects';
import { ImageEffect } from './Effects';
import { ErrorBar } from './components/ErrorBar';

function App() {
    const [ tool, setTool ] = useState<ImTool>();
    const [ inputURL, setInputURL ] = useState<string>();
    const [ outputURL, setOutputURL ] = useState<string>();
    const [ source, setSource ] = useState<string>('fromImage');
    const [ effects, setEffects ] = useState<ImageEffect[]>([]);
    const [ error, setError ] = useState<string>();

    const setImage = (url: string, source: string) => {
        setSource(source);
        setInputURL(url);
    };

    useEffect(() => {
        if (inputURL) {
            fromImage(inputURL).then((tool) => {
                for (let imageEffect of effects) {
                    try {
                        (tool[imageEffect.fn] as Function).apply(tool, imageEffect.arguments);
                    } catch (e) {
                        setError(e.toString());
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
            <ErrorBar error={error} />
            { !tool ?
                <>
                    <SelectFile setImage={setImage} setError={setError} />
                    <CaptureBar setImage={setImage} setError={setError} />
                </>
            :
                <>
                    <FileDetails tool={tool} inputURL={inputURL} outputURL={outputURL} effects={effects} source={source} />
                    <Effects setEffects={setEffects} effects={effects} />
                </>
            }
        </div>
    );
}

export default App;
