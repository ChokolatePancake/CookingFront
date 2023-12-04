import React, {useState} from 'react';
import styles from './Search.module.scss';
import {useSearchRecipeQuery} from "../../../redux/api/cookingForumApi";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";

const Search = () => {
    const [title, setTitle] = useState('');
    const {data, isLoading, error} = useSearchRecipeQuery(title);
    const handleSearch = (e) => {
        setTitle(e.target.value);
    }
    return (
        <div className={styles.searchWrapper}>
            <div className={styles.searchContainer}>
                <input className={styles.search + ' ' + 'recipe-search'} onChange={handleSearch} type="text" placeholder="Search for recipes..."/>
                {
                    data != undefined ?
                        <div className={styles.result}>{isLoading ? <CircularProgress /> : data.map((recipe) => {
                            return <Link className={styles.recipe} to={`recipe/${recipe.id}`}>{recipe.name}</Link>
                        })}</div>   : ''
                }
            </div>
        </div>
    );
};

export default Search;