import React from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { fromImage } from 'imtool';

import { animationProps } from '../animationSettings';

export interface SelectFileProps {
    setImage: (url: string, source: string) => void,
    setError: React.Dispatch<React.SetStateAction<string | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
};

export const SelectFile: React.FC<SelectFileProps> = ({ setImage, setError, setLoading }) => {
    const onDrop = (files: File[]) => {
        if (files[0]) {
            setLoading(true);
            fromImage(files[0]).then(
                tool => tool.toDataURL()
            )
            .then(url => setImage(url, 'fromImage'))
            .catch(e => setError(e.toString()))
            .finally(() => setLoading(false));
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    return (
        // @ts-ignore react-dropzone and framer-motion have some issues together with TypeScript, it works well, though.
        <motion.section {...animationProps} {...getRootProps()} className={"dropzone " + (isDragActive ? 'active' : '')}>
            <input {...getInputProps({ style: {} })} />
            <span>Select your image file by clicking or dropping a file on this area.</span>
        </motion.section>
    );
}
