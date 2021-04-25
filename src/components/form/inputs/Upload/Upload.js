import React, { useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import Dropzone from '../Dropzone/Dropzone';

import './Upload.css';

function Upload({ onChange, sendRequest, ...props }) {
    const [upload, setUpload] = useState({
        files: [],
        isUploading: false,
        progress: {},
        successful: false
    });

    const handleFilesAdded = (files) => {
        setUpload(prev => {
            const updatedFiles = prev.files.concat(files);
            onChange(updatedFiles);
            return {
                ...prev,
                files: updatedFiles
            }
        });
    }

    // const uploadFiles = async () => {
    //     setUpload({ progress: {}, isUploading: true });

    //     const promises = [];
    //     upload.files && upload.files.forEach(file => {
    //         promises.push(sendRequest(file));
    //     });

    //     try {
    //         await Promise.all(promises);
    //         setUpload()
    //     } catch(err) {

    //     }
    // }

    // const renderActions = () => {
    //     if(upload.successful) {
    //         return (
    //             <Button
    //                 onClick={() => {
    //                     setUpload(prev => ({ files: [], successful: false }));
    //                 }}
    //             >
    //                 Clear
    //             </Button>
    //         )
    //     } else {
    //         return (
    //             <Button 
    //                 disabled={!upload.files || upload.files.length < 0 || upload.isUploading}
    //                 onClick={uploadFiles}
    //             >
    //                 Upload
    //             </Button>
    //         )
    //     }
    // }

    const renderProgress = (file) => {
        const uploadProgress = upload.progress && upload.progress[file.name];
        if(upload.isUploading || upload.successful) {
            return (
                <div className="progress-wrapper">
                    <ProgressBar now={uploadProgress ? uploadProgress.percentage : 0} />
                    <img 
                        className="successful-icon"
                        alt="successful"
                        src="/file_download_done_black_24dp.svg"
                        style={{
                            opacity:
                                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                        }}
                    />
                </div>
            )
        }
    }

    return (
        <div className="upload">
            <span className="title">Upload Files</span>
            <div className="content">
                <div>
                    <Dropzone 
                        name={props.name}
                        onFilesAdded={handleFilesAdded}
                        disabled={upload.isUploading || upload.successful}
                    />
                </div>
                <div className="files">
                    {
                        upload.files && upload.files.map((file, idx) => (
                            <div key={`file.name-${idx}`}>
                                <span className="filename">{file.name}</span>
                                {renderProgress(file)}
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* <div className="actions">{renderActions()}</div> */}
        </div>
    );
}

export default Upload;