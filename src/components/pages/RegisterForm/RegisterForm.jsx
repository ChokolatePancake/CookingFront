import React, {useState} from 'react';
import {useRegisterUserMutation} from "../../../redux/api/cookingForumApi";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess} from "../../../redux/features/authSlice";
import {Navigate} from "react-router-dom";
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [hasError, setHasError] = useState(false);
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState('');
    const [registerUser, {isLoading, error}] = useRegisterUserMutation();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileEncode, FilePondPluginImagePreview);
    const handleRegister = (e) => {
        e.preventDefault();
        console.log(picture);
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('nickName', nickName);
        formData.append('picture', JSON.stringify(picture));
        const response = registerUser(formData);
        if (!isLoading) {
            console.log(error)
            if (error) {
                setHasError(true);
            }
            else {
                response.unwrap().then((data) => dispatch(loginSuccess(data.token))).catch((e) => setHasError(true));
            }
        }
    }
    if (isAuth) {
        return <Navigate to='/profile' />
    }
    return (
        <div>
            <h1>Register</h1>
            <div>{hasError ? 'User exist with this nickname or email.' : ''}</div>
            <form onSubmit={handleRegister}>
                <input required type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input required type="text" placeholder="Nick Name" onChange={(e) => setNickName(e.target.value)}/>
                <input required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <FilePond
                    labelIdle='Drag & Drop your account picture or <span class="filepond--label-action"> Browse </span>'
                    allowMultiple={false}
                    allowFileTypeValidation={true}
                    acceptedFileTypes={['image/*']}
                    dropValidation={true}
                    checkValidity={true}
                    stylePanelLayout='integrated'
                    allowFileEncode={true}
                    allowImagePreview={true}
                    onupdatefiles={file => file.length != 0 ? setPicture({name: file[0].filename, base64: file[0].getFileEncodeBase64String()}) : setPicture(null) }
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default RegisterForm;