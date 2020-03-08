import React, { useState, useEffect } from 'react';
import GithubCorner from 'react-github-corner';
import { ImTool } from 'imtool/lib/ImTool';
import { fromImage } from 'imtool';

import './App.scss';
import 'react-image-lightbox/style.css';

import { SelectFile } from './components/SelectFile';
import { CaptureBar } from './components/CaptureBar';
import { FileDetails } from './components/FileDetails';
import { Effects } from './components/Effects';
import { ImageEffect } from './Effects';
import { ErrorBar } from './components/ErrorBar';
import { Library } from './components/Library';
import { LoadingOverlay } from './components/LoadingOverlay';

function App() {
    const [ tool, setTool ] = useState<ImTool>();

    const [ error, setError ] = useState<string>();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ inputURL, setInputURL ] = useState<string>();
    const [ outputURL, setOutputURL ] = useState<string>();
    const [ source, setSource ] = useState<string>('fromImage');

    const [ effects, setEffects ] = useState<ImageEffect[]>([]);
    const [ effectErrors, setEffectErrors ] = useState<{ [k: string]: string }>({});

    const setImage = (url: string, source: string) => {
        setSource(source);
        setInputURL(url);
    };

    useEffect(() => {
        if (inputURL) {
            fromImage(inputURL).then((tool) => {
                for (let imageEffect of effects) {
                    const errors: { [k: string]: string } = {};

                    try {
                        (tool[imageEffect.fn] as Function).apply(tool, imageEffect.arguments);
                    } catch (e) {
                        errors[imageEffect.id] = e.toString();
                    }

                    setEffectErrors(errors);
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
            <GithubCorner href="https://github.com/mat-sz/imtool-demo" octoColor="#333" bannerColor="#ccc" />
            <LoadingOverlay active={loading} />
            <h1>imtool</h1>
            <Library />
            <ErrorBar error={error} />
            { !tool ?
                <>
                    <SelectFile setImage={setImage} setError={setError} setLoading={setLoading} />
                    <CaptureBar setImage={setImage} setError={setError} setLoading={setLoading} />
                </>
            :
                <>
                    <FileDetails tool={tool} inputURL={inputURL} outputURL={outputURL} effects={effects} source={source} />
                    <Effects setEffects={setEffects} effects={effects} effectErrors={effectErrors} />
                </>
            }
        </div>
    );
}

export default App;
