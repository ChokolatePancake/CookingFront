import React, {useState} from 'react';
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {useRecipeAddMutation} from "../../../redux/api/cookingForumApi";
import {useDispatch, useSelector} from "react-redux";
import {addStep} from "../../../redux/features/addRecipeSlice";
import StepForm from "../../forms/StepForm/StepForm";
import RecipeCategorySelect from "../../UI/RecipeCategorySelect/RecipeCategorySelect";
import styles from "./AddRecipeForm.module.scss";

const AddRecipeForm = () => {
    registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileEncode, FilePondPluginImagePreview, FilePondPluginFileValidateSize);
    const [picture, setPicture] = useState(null);
    const [fileLoadDisabled, setFileLoadDisabled] = useState(false);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [cookingTime, setCookingTime] = useState(0);
    const [isAddedRecipe, setIsAddedRecipe] = useState(false);
    const [recipeId, setRecipeId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [addRecipe, {isLoading}] = useRecipeAddMutation();
    const countSteps = useSelector(state => state.addRecipe.countSteps);
    const [isPictureLoading, setIsPictureLoading] = useState(false);
    const dispatch = useDispatch();
    let stepForms = [];
    for (let i = 0; i < countSteps; i++) {
        stepForms.push(<StepForm key={i} number={i+1} recipeId={recipeId} />)
    }
    const handleAddRecipe = (e) => {
        e.preventDefault();
        if (!isAddedRecipe) {
            setFileLoadDisabled(true);
            const response = addRecipe({
                picture,
                name,
                ingredients,
                time: cookingTime,
                category: categories
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
            <h1 className={styles.title}>Add Recipe</h1>
            <form className={styles.form} onSubmit={handleAddRecipe}>
                <input className={styles.inputs} required type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
                <textarea className={styles.ingredients + ' ' + styles.inputs} required placeholder='Ingredients' onChange={(e) => setIngredients(e.target.value)} />
                <input className={styles.inputs} required type="number" min="0" max="1440"  placeholder='Cooking time' onChange={(e) => setCookingTime(e.target.value)}/>
                <div className={styles.categories}><RecipeCategorySelect defaultValue={categories} onChange={(e) =>  setCategories(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)} /></div>
                <div><FilePond className={styles.picture}
                    labelIdle='Drag & Drop your recipe picture or <span class="filepond--label-action"> Browse </span>'
                    allowMultiple={false}
                    allowFileTypeValidation={true}
                    disabled={fileLoadDisabled}
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
                    onupdatefiles={file => file.length != 0 ? setPicture(JSON.stringify({name: file[0].filename, base64: file[0].getFileEncodeBase64String()})) : setPicture(null) }
                />
                </div>
                <div className={styles.button}>
                {
                    countSteps == 0
                        ? <button type='submit' disabled={isPictureLoading}>Add step</button>
                        : ''
                }
                </div>
            </form>
            {stepForms}
        </div>
    );
};

export default AddRecipeForm;