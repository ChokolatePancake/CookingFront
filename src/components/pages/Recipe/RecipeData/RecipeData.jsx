import React, { useEffect } from 'react';
import { useAddActivityMutation } from '../../../../redux/api/cookingForumApi';
import { useSelector } from 'react-redux';
import styles from './RecipeData.module.scss';
import RecipeAddToFavorite from "../../../RecipeAddToFavorite/RecipeAddToFavorite";
import moment from 'moment';
import getEnvVar from '../../../../redux/features/getEnvVars';

const RecipeData = ({ data, userData, recipeId }) => {
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
        {data.picture ? <img className={styles.picture} src={`${getEnvVar('BACKEND_URL')}/` + data.picture} alt="" /> : ''}
        <div className={styles.info}>
          <div><div>Time: </div>
            {data.time} mins</div>
          <div className={styles.ingredients}><div>Ingredients: </div>
            <ul>
              {data.ingredients && data.ingredients.split("\n").map(ingredient => (
                <li key={ingredient} className={styles.ingredient}>
                  {ingredient}
                </li>
              ))}
            </ul></div>
          <div><div>Date: </div>
            {moment(data.date).format('MMMM Do YYYY, h:mm:ss a')}</div>
          <div><div>Category: </div>
            {data.category.join(', ')}</div>
          <div><div>Author: </div>
            {data.authorNickname}</div>
          <div className={styles.favorite}><RecipeAddToFavorite recipeId={recipeId} /></div>
        </div>
      </div>
      <div className={styles.steps}>
        {
          data.steps.map(step =>
            <div key={step.number} className={styles.step_container}>
              <h3 className={styles.step}>Step {step.number}</h3>
              <div className={styles.step_info}>
                {step.picture ? <img className={styles.picture} src={`${getEnvVar('BACKEND_URL')}/` + step.picture} alt="" /> : ''}
                <p className={`${styles.step_description} ${!step.picture ? styles.lm_rm : ''}`}>{step.text}</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default RecipeData;