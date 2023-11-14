import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import {
    useAddActivityMutation,
    useAddCommentMutation, useExistActivityQuery,
    useGetCommentsQuery,
    useProfileQuery,
    useRecipeQuery,
} from '../../../redux/api/cookingForumApi';
import {CircularProgress} from "@mui/material";
import RecipeCommentBox from "../../UI/RecipeCommentBox/RecipeCommentBox";
import {useSelector} from "react-redux";
import RecipeAddToFavorite from "../../RecipeAddToFavorite/RecipeAddToFavorite";
import RecipeData from './RecipeData/RecipeData';
import Avatar from '../../../assets/icons/avatar.png'

const Recipe = () => {
    let {id} = useParams();
    let currentUser = null;
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const userData = useProfileQuery();
    const {data, isLoading, error} = useRecipeQuery(id);
    const comments = useGetCommentsQuery(id);
    const [addComment, addCommentData] = useAddCommentMutation();
    if (isLoading || userData.isLoading || comments.isLoading) {
        return <CircularProgress />
    }
    if (!userData.error && isAuth) {
        currentUser = {
            currentUserId: userData.data.id,
            currentUserImg: userData.data.picture ? 'http://localhost:8080/' + userData.data.picture : null,
            currentUserProfile: null,
            currentUserFullName: userData.data.nickName,
        };
    }
    console.log(userData)
    const buildCommentData = (comment) => {
        let replies = [];
        if (comment.replies) {
            comment.replies.map(reply => {
                replies.push(buildCommentData(reply))
            })
        }
        return {
            userId: comment.authorId,
            comId: comment.id,
            fullName: comment.authorNickname,
            avatarUrl: comment.picture ? 'http://localhost:8080/'+ comment.picture : Avatar,
            userProfile: null,
            text: comment.message,
            replies: replies
        }
    }
    let commentsData = [];
    comments.data.map(comment => {
        commentsData.push(buildCommentData(comment));
    });
    const handleAddComment = async (e) => {
        let parentCommentId = e.parentOfRepliedCommentId ? e.parentOfRepliedCommentId : null;
        if (!parentCommentId) {
            parentCommentId = e.repliedToCommentId ? e.repliedToCommentId : null;
        }
       const response = await addComment({
           id: id,
           body: {
               message: e.text,
               commentId: parentCommentId
           },
       });
    }
    return (
        <div>
            <RecipeAddToFavorite recipeId={id} />
            <RecipeData recioeId={id} data={data} userData={userData} />
            <div>
                <RecipeCommentBox comments={commentsData} currentUser={currentUser} onSubmit={(e) => handleAddComment(e)} />
            </div>
        </div>
    );
};

export default Recipe;