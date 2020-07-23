import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { uploadPhoto } from '../store/actions/photoActions';
import { ErrorMessage } from '../components/form';

const PhotoUpload = (props) => {
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
            if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
                setErrors({ fatalError: 'Images with only .jpg, .jpeg and .png are acceptable' });
                fileInputRef.current.value = "";
                return;
            }
            else if (newFile.size > 1000000) {
                setErrors({ fatalError: 'Images with size more than 1MB are not acceptable' });
                fileInputRef.current.value = "";
                return;
            } else {
                setErrors(null)
                dispatch(uploadPhoto(event.target.files[0], '/auth/upload-profile-picture'));
                readUrl(event);
            }
        }
    }

    return (
        <>
            <img ref={imgRef} src={!url ? require('../images/users/user.jpg') : url} width="100" style={{ marginBottom: '10px' }} />
            <input ref={fileInputRef} type="file" onChange={onAddingImage} />
            {errors && errors.fatalError ? <ErrorMessage error={errors.fatalError} visible={true} /> : null}
        </>
    )
}

export default PhotoUpload;