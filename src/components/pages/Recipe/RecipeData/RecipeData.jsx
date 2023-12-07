import React, { useEffect } from 'react';
import { useAddActivityMutation } from '../../../../redux/api/cookingForumApi';
import { useSelector } from 'react-redux';
import styles from './RecipeData.module.scss';
import RecipeAddToFavorite from "../../../RecipeAddToFavorite/RecipeAddToFavorite";

const RecipeData = ({data, userData, recipeId}) => {
  const [addActivity, addActivityData] = useAddActivityMutation();
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  useEffect(() => {
    console.log('test');
    if (isAuth) {
      if (userData.data.id != data.authorId) {
        addActivity(recipeId);
      }
    }
  }, []);
  return (
    <div>
      <div className={styles.title}>
            <h1>{data.name}</h1>
      </div>
        <div className={styles.recipe_data}>
            {data.picture ? <img className={styles.picture} src={'http://localhost:8080/' + data.picture} alt=""/> : ''}
      <div className={styles.info}>
          <div><div>Time: </div>
              {data.time} mins</div>
          <div><div>Ingredients: </div>
              {data.ingredients}</div>
          <div><div>Date: </div>
              {data.date}</div>
          <div><div>Category: </div>
              {data.category.join(', ')}</div>
          <div><div>Author: </div>
              {data.authorNickname}</div>
          <div className={styles.favorite}><RecipeAddToFavorite recipeId={recipeId} /></div>
      </div>
        </div>
      {
        data.steps.map(step =>
          <div key={step.number}>
            <h3 className={styles.step}>Step {step.number}</h3>
              <div className={styles.step_info}>
                  {step.picture ? <img className={styles.picture} src={'http://localhost:8080/' + step.picture} alt=""/> : ''}
                  <p className={styles.step_description}>{step.text}</p>
              </div>
          </div>
        )
      }
    </div>
  );
};

export default RecipeData;