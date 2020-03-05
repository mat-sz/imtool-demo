import React, { useState, useEffect } from 'react';
import { ImTool } from 'imtool/lib/ImTool';
import { fromImage } from 'imtool';

import './App.scss';
import { SelectFile } from './components/SelectFile';
import { FileDetails } from './components/FileDetails';

function App() {
    const [ file, setFile ] = useState<File>();
    const [ tool, setTool ] = useState<ImTool>();
    const [ inputURL, setInputURL ] = useState<string>();
    const [ outputURL, setOutputURL ] = useState<string>();

    useEffect(() => {
        if (file) {
            fromImage(file).then(
                (tool) => setTool(tool)
            );
        }
    }, [ file ]);

    useEffect(() => {
        if (tool) {
            tool.toDataURL().then((url) => {
                setInputURL(url);
                setOutputURL(url);
            });
        }
    }, [ tool ])

    return (
        <div className="App">
            <h1>imtool</h1>
            <SelectFile onFile={setFile} />
            <FileDetails tool={tool} inputURL={inputURL} outputURL={outputURL} />
        </div>
    );
}

export default App;
