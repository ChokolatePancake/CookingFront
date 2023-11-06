import React, {useState} from 'react';
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {useRecipeAddMutation} from "../../../redux/api/cookingForumApi";
import {useDispatch, useSelector} from "react-redux";
import {addStep} from "../../../redux/features/addRecipeSlice";
import StepForm from "../../forms/StepForm/StepForm";

const AddRecipeForm = () => {
    registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileEncode, FilePondPluginImagePreview);
    const [picture, setPicture] = useState(null);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [cookingTime, setCookingTime] = useState(0);
    const [isAddedRecipe, setIsAddedRecipe] = useState(false);
    const [recipeId, setRecipeId] = useState(null);
    let [steps, setSteps] = useState(0);
    const [addRecipe, {isLoading}] = useRecipeAddMutation();
    const countSteps = useSelector(state => state.addRecipe.countSteps);
    const dispatch = useDispatch();
    let stepForms = [];
    for (let i = 0; i < countSteps; i++) {
        stepForms.push(<StepForm key={i} number={i+1} recipeId={recipeId} />)
    }
    const handleAddRecipe = (e) => {
        e.preventDefault();
        if (!isAddedRecipe) {
            const response = addRecipe({
                picture,
                name,
                ingredients,
                time: cookingTime
            });
            response.unwrap().then((data) => setRecipeId(data.id));
            if (!isLoading) {
                setIsAddedRecipe(true);
            }
        }
        dispatch(addStep());
    }

    return (
        <div>
            <h1>Add Recipe</h1>
            <form onSubmit={handleAddRecipe}>
                <input required type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
                <textarea required placeholder='Ingredients' onChange={(e) => setIngredients(e.target.value)} />
                <input required type="number" placeholder='Cooking time' onChange={(e) => setCookingTime(e.target.value)}/>
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
                {
                    countSteps == 0
                    ? <button type='submit'>Add step</button>
                        : ''
                }
            </form>
            {stepForms}
        </div>
    );
};

export default AddRecipeForm;