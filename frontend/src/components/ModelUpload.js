import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { uploadModel } from '../store/actions/projectActions';
import { ErrorMessage } from './form';

const ModelUpload = (props) => {
    const dispatch = useDispatch();
    const [url, setUrl] = useState(props.url);
    const [errors, setErrors] = useState()
    const imgRef = useRef();
    const fileInputRef = useRef();

    const readUrl = (event) => {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event) => setUrl(event.target.result);
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    useEffect(() => {
        setUrl(props.url);
    }, [props.url])

    const onAddingImage = event => {
        if (event.target.files[0]) {
            let newFile = event.target.files[0];
            let ext = newFile.name.split('.')[1].toLowerCase();
            if (ext !== '3dm' && ext !== 'obj' && ext !== 'zip' && ext !== 'fbx' && ext !== 'max' && ext !== 'dae') {
                setErrors({ fatalError: 'Models with only .3dm, .obj, .zip, .fbx are acceptable' });
                fileInputRef.current.value = "";
                return;
            }
            else if (newFile.size > 300000000) {
                setErrors({ fatalError: 'Models with size more than 3MB are not acceptable' });
                fileInputRef.current.value = "";
                return;
            } else {
                setErrors(null)
                dispatch(uploadModel(event.target.files[0], '/project/upload-model'));
                readUrl(event);
            }
        }
    }

    

    return (
        <>
            {/* <img ref={imgRef} src={!url ? null : url} width="100" style={{ marginBottom: '10px' }} /> */}
            <input ref={fileInputRef} type="file" onChange={onAddingImage} />
            {errors && errors.fatalError ? <ErrorMessage error={errors.fatalError} visible={true} /> : null}
        </>
    )
}

export default ModelUpload;