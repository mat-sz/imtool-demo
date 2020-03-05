import React, { useState } from 'react';

import './App.scss';
import { SelectFile } from './components/SelectFile';

function App() {
    const [ file, setFile ] = useState<File>();

    return (
        <div className="App">
            <h1>imtool demo</h1>
            <SelectFile onFile={setFile} />
        </div>
    );
}

export default App;
