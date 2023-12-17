import React from 'react';
import RecentRecipes from "./RecentRecipes/RecentRecipes";
import RecommendationRecipes
  from './RecommendationRecipes/RecommendationRecipes';

const Home = () => {
    return (
        <div>
            <RecentRecipes />
            <RecommendationRecipes />
        </div>
    );
};

export default Home;