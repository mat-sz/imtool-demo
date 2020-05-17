import React, { useState, useEffect, useCallback } from "react";
import GithubCorner from "react-github-corner";
import { ImTool } from "imtool/lib/ImTool";
import { fromImage } from "imtool";

import "./App.scss";
import "react-image-lightbox/style.css";

import { SelectFile } from "./components/SelectFile";
import { CaptureBar } from "./components/CaptureBar";
import { FileDetails } from "./components/FileDetails";
import { Effects } from "./components/Effects";
import { ImageEffect } from "./Effects";
import { ErrorBar } from "./components/ErrorBar";
import { Library } from "./components/Library";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { AnimatePresence } from "framer-motion";

function App() {
  const [tool, setTool] = useState<ImTool>();

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputURL, setInputURL] = useState<string>();
  const [outputURL, setOutputURL] = useState<string>();
  const [source, setSource] = useState<string>("fromImage");

  const [effects, setEffects] = useState<ImageEffect[]>([]);
  const [effectErrors, setEffectErrors] = useState<{ [k: string]: string }>({});

  const setImage = useCallback(
    (url: string, source: string) => {
      setSource(source);
      setError(undefined);
      setInputURL(url);
    },
    [setSource, setError, setInputURL]
  );

  useEffect(() => {
    if (inputURL) {
      fromImage(inputURL).then((tool) => {
        const errors: { [k: string]: string } = {};
        for (let imageEffect of effects) {
          try {
            (tool[imageEffect.fn] as Function).apply(
              tool,
              imageEffect.arguments
            );
          } catch (e) {
            errors[imageEffect.id] = e.toString();
          }
        }

        tool.toDataURL().then((url) => {
          setEffectErrors(errors);
          setTool(tool);
          setOutputURL(url);
        });
      });
    }
  }, [inputURL, effects]);

  return (
    <div className="App">
      <GithubCorner
        href="https://github.com/mat-sz/imtool-demo"
        octoColor="#333"
        bannerColor="#ccc"
      />
      <LoadingOverlay active={loading} />
      <h1>imtool</h1>
      <Library />
      <AnimatePresence>
        {!inputURL ? (
          <>
            <ErrorBar key="error-bar" error={error} />
            <SelectFile
              key="select-file"
              setImage={setImage}
              setError={setError}
              setLoading={setLoading}
            />
            <CaptureBar
              key="capture-bar"
              setImage={setImage}
              setError={setError}
              setLoading={setLoading}
            />
          </>
        ) : (
          <>
            <FileDetails
              key="details"
              tool={tool}
              inputURL={inputURL}
              outputURL={outputURL}
              effects={effects}
              source={source}
            />
            <Effects
              key="effects"
              setEffects={setEffects}
              effects={effects}
              effectErrors={effectErrors}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
