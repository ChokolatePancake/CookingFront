import React, { useEffect } from 'react';
import { useAddActivityMutation } from '../../../../redux/api/cookingForumApi';
import { useSelector } from 'react-redux';

const RecipeData = ({data, userData, recioeId}) => {
  const [addActivity, addActivityData] = useAddActivityMutation();
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  useEffect(() => {
    console.log('test');
    if (isAuth) {
      if (userData.data.id != data.authorId) {
        addActivity(recioeId);
      }
    }
  }, []);
  return (
    <div>
      <h1>{data.name}</h1>
      {data.picture ? <img src={'http://localhost:8080/' + data.picture} alt=""/> : ''}
      <div>Time: {data.time}</div>
      <div>Ingredients: {data.ingredients}</div>
      <div>Date: {data.date}</div>
      <div>Category: {data.category.join(', ')}</div>
      <div>Author: {data.authorNickname}</div>
      {
        data.steps.map(step =>
          <div key={step.number}>
            <div>{step.number}</div>
            {step.picture ? <img src={'http://localhost:8080/' + step.picture} alt=""/> : ''}
            <p>{step.text}</p>
          </div>
        )
      }
    </div>
  );
};

export default RecipeData;