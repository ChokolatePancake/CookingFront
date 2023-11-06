import React, {useState} from 'react';
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {usePublishRecipeMutation, useStepAddMutation} from "../../../redux/api/cookingForumApi";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {addStep, resetSteps} from "../../../redux/features/addRecipeSlice";

const StepForm = ({number, recipeId}) => {
    const [picture, setPicture] = useState(null);
    const [text, setText] = useState('');
    const [redirectToRecipe, setRedirectToRecipe] = useState(false);
    const [addRecipeStep, {isLoading}] = useStepAddMutation();
    const [publishRecipe, publishRecipeData] = usePublishRecipeMutation();
    const countSteps = useSelector(state => state.addRecipe.countSteps);
    const dispatch = useDispatch();
    registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileEncode, FilePondPluginImagePreview);
    const addNewStep = (e, finish = false) => {
        e.preventDefault();
        const response = addRecipeStep({
            id: recipeId,
            body: {
                number,
                text,
                picture
            }
        });
        if (!finish) {
            dispatch(addStep());
        }
        else {
            const publishResponse = publishRecipe(recipeId);
            if (!publishRecipeData.isLoading) {
                dispatch(resetSteps());
                setRedirectToRecipe(true);
            }
        }
    }
    // if (redirectToRecipe && !publishRecipeData.isLoading) {
    //     return <Navigate to={`/recipe/${recipeId}`} />
    // }
    return (
        <div>
            <div>{number}</div>
            <form onSubmit={addNewStep}>
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
                    onupdatefiles={file => file.length != 0 ? setPicture(JSON.stringify({name: file[0].filename, base64: file[0].getFileEncodeBase64String()})) : setPicture(null) }
                />
                <textarea placeholder='Description' onChange={(e) => setText(e.target.value)} />
                { number == countSteps ?
                <div>
                    <button type='submit'>Add next step</button>
                    <button onClick={(e) => {addNewStep(e, true)}} type='button'>Submit recipe</button>
                </div>
                    :
                    ''
                }
            </form>
        </div>
    );
};

export default StepForm;