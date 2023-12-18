import React from 'react';
import {
  useGetRecommendedRecipesQuery
} from '../../../../redux/api/cookingForumApi';
import { CircularProgress } from '@mui/material';
import RecipeBlock from '../../../RecipeBlock/RecipeBlock';
import styles from './RecommendationRecipes.module.scss';

const RecommendationRecipes = () => {
  const {data, isLoading, error} = useGetRecommendedRecipesQuery();
  if (isLoading) {
    return <CircularProgress />
  }
  if (error || !data || data.length == 0) {
    return <div></div>;
  }
  return (
    <div>
      <h2>{data ? 'Recommended recipes' : ''}</h2>
      <div className={styles.recipes}>
        {data.map((recipe) => (
          <RecipeBlock recipe={recipe} key={recipe.id}/>
        ))}
      </div>
    </div>
  );
};

export default RecommendationRecipes;