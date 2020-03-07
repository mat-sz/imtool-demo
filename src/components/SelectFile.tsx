import React from 'react';
import { useDropzone } from 'react-dropzone';
import { fromImage } from 'imtool';

export interface SelectFileProps {
    setImage: (url: string, source: string) => void,
};

export const SelectFile: React.FC<SelectFileProps> = ({ setImage }) => {
    const onDrop = (files: File[]) => {
        if (files[0]) {
            fromImage(files[0]).then(
                tool => tool.toDataURL().then(url => setImage(url, 'fromImage'))
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
