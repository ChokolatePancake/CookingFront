import React, {useState} from 'react';
import styles from './Search.module.scss';
import {useSearchRecipeQuery} from "../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";

const Search = () => {
    const [title, setTitle] = useState('');
    const [visible, setVisible] = useState(false);
    const {data, isLoading, error} = useSearchRecipeQuery(title);
    const handleSearch = (e) => {
        setTitle(e.target.value);
    }
    return (
        <div className={styles.searchWrapper + ' ' + 'recipe-search'}>
            <div className={styles.searchContainer}>
                <input onBlur={async () => {setTimeout(() => setVisible(false), 200)}} onFocus={() => setVisible(true)} className={styles.search} onChange={handleSearch} type="text" placeholder="Search for recipes..."/>
                {
                    data != undefined ?
                        <div style={{display: visible ? 'flex' : 'none'}} className={styles.result}>{isLoading ? <CircularProgress /> : data.map((recipe) => {
                            let recipeImage = '';
                            if (recipe.picture) {
                                recipeImage = <img className={styles.picture} src={'http://localhost:8080/' + recipe.picture}/>;
                            }
                            return <Link className={styles.recipe} to={`recipe/${recipe.id}`}>
                                <div className={styles.name}>{recipe.name}</div>
                                {recipeImage}
                            </Link>
                        })}</div>   : ''
                }
            </div>
        </div>
    );
};

export default Search;