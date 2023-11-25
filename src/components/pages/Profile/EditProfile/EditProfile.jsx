import React, {useState} from 'react';
import {useProfileEditMutation, useProfileQuery} from "../../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {useDispatch} from "react-redux";
import {Navigate} from "react-router-dom";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

const EditProfile = () => {
    const {data, isLoading, error} = useProfileQuery();
    const [picture, setPicture] = useState(null);
    const [description, setDescription] = useState(null);
    const [dataUpdated, setDataUpdated] = useState(false);
    const [profileEdit, editData] = useProfileEditMutation();
    const [isPictureLoading, setIsPictureLoading] = useState(false);
    registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileEncode, FilePondPluginImagePreview, FilePondPluginFileValidateSize);
    const handleEditProfile = (e) => {
        e.preventDefault();
        let userId = data.id;
        if (picture || description) {
            const formData = new FormData();
            const response = profileEdit({id: data.id, body: {picture: picture ? JSON.stringify(picture) : null, description: description ? description : data.description}});
            if (!editData.isLoading) {
                setDataUpdated(true);
            }
        }
    }
    if (dataUpdated) {
        return <Navigate to='/profile' />
    }
    if (isLoading) {
        return <CircularProgress />
    }
    return (
        <div>
            <h1>Edit profile</h1>
            <form onSubmit={handleEditProfile}>
                <FilePond
                    labelIdle='Drag & Drop your account picture or <span class="filepond--label-action"> Browse </span>'
                    allowMultiple={false}
                    allowFileTypeValidation={true}
                    acceptedFileTypes={['image/*']}
                    allowFileSizeValidation={true}
                    maxFileSize={'19MB'}
                    dropValidation={true}
                    checkValidity={true}
                    stylePanelLayout='integrated'
                    allowFileEncode={true}
                    allowImagePreview={true}
                    onaddfile={() => setIsPictureLoading(false)}
                    onaddfilestart={() => setIsPictureLoading(true)}
                    onupdatefiles={file => file.length != 0 ? setPicture({name: file[0].filename, base64: file[0].getFileEncodeBase64String()}) : setPicture(null) }
                />
                <textarea onChange={(e) => setDescription(e.target.value)} placeholder='description' defaultValue={data.description} />
                <button type='submit' disabled={isPictureLoading}>Submit</button>
            </form>
        </div>
    );
};

export default EditProfile;