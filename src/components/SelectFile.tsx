import React from 'react';
import { useDropzone } from 'react-dropzone';
import { fromImage } from 'imtool';

export interface SelectFileProps {
    setInputURL: React.Dispatch<React.SetStateAction<string | undefined>>
};

export const SelectFile: React.FC<SelectFileProps> = ({ setInputURL }) => {
    const onDrop = (files: File[]) => {
        if (files[0]) {
            fromImage(files[0]).then(
                tool => tool.toDataURL().then(url => setInputURL(url))
            );
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    return (
        <div {...getRootProps()} className={"dropzone " + (isDragActive ? 'active' : '')}>
            <input {...getInputProps({ style: {} })} />
            <span>Select your image file by clicking or dropping a file on this area.</span>
        </div>
    );
}
