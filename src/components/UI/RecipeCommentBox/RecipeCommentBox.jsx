import React from 'react';
import {CommentSection} from "react-comments-section";

const RecipeCommentBox = ({onSubmit, comments = [], currentUser = null}) => {
    return (
        <div>
            <CommentSection currentUser={currentUser} logIn={{
                loginLink: '/login',
                signupLink: '/register'
            }} commentData={comments} onSubmitAction={onSubmit} onReplyAction={onSubmit}  />
        </div>
    );
};

export default RecipeCommentBox;