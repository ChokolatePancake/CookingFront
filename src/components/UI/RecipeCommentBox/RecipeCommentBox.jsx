import React from 'react';
import { CommentSection } from "react-comments-section";
import './RecipeCommentBox.scss';

const RecipeCommentBox = ({ onSubmit, comments = [], currentUser = null }) => {
    return (
        comments == [] ? <div className="no-comments">No comments yet</div> :
            (<div>
                <CommentSection
                    currentUser={currentUser}
                    logIn={{
                        loginLink: '/login',
                        signupLink: '/register'
                    }}
                    commentData={comments}
                    onSubmitAction={onSubmit}
                    onReplyAction={onSubmit}
                    imgStyle={{ objectFit: 'cover', objectPosition: 'top center', borderRadius: '50%', width: '60px', height: '60px' }}
                    formStyle={{ marginTop: '25px' }}
                    advancedInput={true}
                />
            </div>)
    );
};

export default RecipeCommentBox;