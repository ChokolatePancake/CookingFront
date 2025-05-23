import React, { useEffect } from 'react';
import { CommentSection } from "react-comments-section";
import './RecipeCommentBox.scss';

const RecipeCommentBox = ({ onSubmit, comments = [], currentUser = null }) => {
    useEffect(() => {
        const setUsrImgTop = () => {
            const overlays = document.querySelectorAll('.advanced-overlay');
            overlays.forEach(overlay => {
                if (window.innerWidth <= 992) {
                    const toolbar = overlay.querySelector('.rdw-editor-toolbar');
                    const userImgs = overlay.querySelectorAll('.userImg');
                    const toolbarHeight = toolbar ? toolbar.offsetHeight : 0;
                    userImgs.forEach(userImg => {
                        userImg.style.top = `${toolbarHeight + 40}px`;
                    });
                } else {
                    const userImgs = overlay.querySelectorAll('.userImg');
                    userImgs.forEach(userImg => {
                        userImg.style.top = '';
                    });
                }
            });
        };

        // Початкове встановлення
        setUsrImgTop();

        // Слухач для resize
        const handleResize = () => {
            setUsrImgTop();
        };
        window.addEventListener('resize', handleResize);

        // MutationObserver для відстеження нових елементів
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Перевіряємо, чи додались нові .advanced-overlay елементи
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.classList?.contains('advanced-overlay') ||
                                node.querySelector?.('.advanced-overlay')) {
                                // Невелика затримка для завершення рендерингу
                                setTimeout(setUsrImgTop, 10);
                            }
                        }
                    });
                }
            });
        });

        // Спостерігаємо за змінами в DOM
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

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