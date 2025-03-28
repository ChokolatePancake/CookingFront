import React, {useState} from 'react';
import {useRegisterUserMutation} from "../../../redux/api/cookingForumApi";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess} from "../../../redux/features/authSlice";
import {Link, Navigate} from "react-router-dom";
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import styles from './RegisterForm.module.scss'

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [hasError, setHasError] = useState(false);
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState(null);
    const [registerUser, {isLoading, error}] = useRegisterUserMutation();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const [isPictureLoading, setIsPictureLoading] = useState(false);
    registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileEncode, FilePondPluginImagePreview, FilePondPluginFileValidateSize);
    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('nickName', nickName);
        if (picture) {
            formData.append('picture', JSON.stringify(picture));
        }
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
        <div className={styles.signup}>
            <h1>Register</h1>
            <div>{hasError ? 'User exist with this nickname or email.' : ''}</div>
            <form className={styles.form} onSubmit={handleRegister}>
                <div className={styles.inputs}>
                    <input className={styles.input} required type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <input className={styles.input} required type="text" placeholder="Nick Name" onChange={(e) => setNickName(e.target.value)}/>
                    <input className={styles.input} required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
               <div className={styles.item}>
                <FilePond className={styles.picture}
                    labelIdle='Drag & Drop your account picture or <span class="filepond--label-action"> Browse </span>'
                    allowMultiple={false}
                    allowFileTypeValidation={true}
                    acceptedFileTypes={['image/*']}
                    dropValidation={true}
                    checkValidity={true}
                    stylePanelLayout='integrated'
                    allowFileEncode={true}
                    allowImagePreview={true}
                    allowFileSizeValidation={true}
                    maxFileSize={'19MB'}
                    onaddfile={() => setIsPictureLoading(false)}
                    onaddfilestart={() => setIsPictureLoading(true)}
                    onupdatefiles={file => file.length != 0 ? setPicture({name: file[0].filename, base64: file[0].getFileEncodeBase64String()}) : setPicture(null) }
                />
                <button className={styles.button} type="submit" disabled={isPictureLoading}>Sign Up</button>
                <div className={styles.login}>Do you already have an account?<Link to={"/login"}>LogIn</Link></div>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;