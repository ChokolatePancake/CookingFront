import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getToken = state => state.auth.token;

export const cookingForumApi = createApi({
    reducerPath: "cookingForumApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api",
        prepareHeaders: (headers, { getState }) => {
            const token = getToken(getState());
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['profile', 'comment', 'favorite', 'recipe'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body: body,
                formData: true,
            }),
        }),
        loginUser: builder.mutation({
            query: (body) => ({
                url: '/auth/authenticate',
                method: 'POST',
                body: body
            })
        }),
        profile: builder.query({
            query: () => ({
                url: '/profile',
                method: 'GET'
            }),
            providesTags: ['profile']
        }),
        profileEdit: builder.mutation({
            query: ({id, body}) => ({
              url: `/profile/edit/${id}`,
              method: 'POST',
              body: body,
            }),
            invalidatesTags: ['profile']
        }),
        recipeAdd: builder.mutation({
            query: (body) => ({
                url: '/recipe/create',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['recipe']
        }),
        stepAdd: builder.mutation({
            query: ({id, body}) => ({
                url: `/recipe/${id}/step/create`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['recipe']
        }),
        publishRecipe: builder.mutation({
            query: (id) => ({
                url: `/recipe/${id}/publish`,
                method: 'POST'
            }),
            invalidatesTags: ['profile']
        }),
        recipe: builder.query({
            query: (id) => ({
                url: `/recipe/${id}`,
                method: 'GET'
            }),
            providesTags: ['recipe']
        }),
        profileRecipes: builder.query({
            query: () => ({
                url: '/profile/recipes',
                method: 'GET'
            }),
            providesTags: ['profile', 'recipe']
        }),
        addComment: builder.mutation({
            query: ({id, body}) => ({
                url: `/recipe/${id}/comment/add`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['comment']
        }),
        getComments: builder.query({
            query: (id) => ({
                url: `/recipe/${id}/comments`,
                method: 'GET'
            }),
            providesTags: ['comment']
        }),
        changeFavorite: builder.mutation({
            query: (id) => ({
                url: `/recipe/${id}/favorite/`,
                method: 'POST'
            }),
            invalidatesTags: ['favorite']
        }),
        // addToFavorite: builder.mutation({
        //     query: (id) => ({
        //         url: `/recipe/${id}/favorite/add`,
        //         method: 'POST'
        //     }),
        //     invalidatesTags: ['favorite']
        // }),
        // removeFavorite: builder.mutation({
        //     query: (id) => ({
        //         url: `/recipe/${id}/favorite/remove`,
        //         method: 'POST'
        //     }),
        //     invalidatesTags: ['favorite']
        // }),
        getFavorites: builder.query({
            query: () => ({
                url: '/recipe/favorites',
                method: 'GET'
            }),
            providesTags: ['favorite']
        }),
        isFavorite: builder.query({
            query: (id) => ({
                url: `/recipe/${id}/favorite`,
                method: 'GET'
            }),
            providesTags: ['favorite', 'profile']
        }),
        searchRecipe: builder.query({
            query: (title) => ({
                url: `/recipe/search/${title}`,
                method: 'GET'
            }),
            providesTags: ['recipe']
        }),
        addActivity: builder.mutation({
            query: (recipeId) => ({
                url: `/activity/${recipeId}/create`,
                method: 'POST'
            }),
        }),
        getRecipes: builder.mutation({
            query: (body) => ({
                url: `/recipe/all`,
                method: 'POST',
                body: body
            }),
            providesTags: ['recipe']
        }),
        getRecentRecipes: builder.query({
            query: () => ({
                url: '/recipe/recent',
                method: 'GET'
            }),
            providesTags: ['recipe']
        }),
        removeRecipe: builder.mutation({
            query: (recipeId) => ({
                url: `/recipe/${recipeId}/delete`,
                method: 'DELETE'
            }),
            invalidatesTags: ['recipe']
        }),
        isRecipesAuthor: builder.query({
            query: (recipeId) =>({
                url: `/recipe/${recipeId}/isAuthor`,
                method: 'GET'
            })
        }),
        getRecommendedRecipes: builder.query({
            query: () => ({
                url: '/recipe/recommended',
                method: 'GET'
            })
        }),
    })
});


export const {
    useIsRecipesAuthorQuery,
    useRemoveRecipeMutation,
    useGetRecentRecipesQuery,
    useGetRecommendedRecipesQuery,
    useGetRecipesMutation,
    useRegisterUserMutation,
    useLoginUserMutation,
    useProfileQuery,
    useProfileEditMutation,
    useRecipeAddMutation,
    useStepAddMutation,
    usePublishRecipeMutation,
    useRecipeQuery,
    useProfileRecipesQuery,
    useAddCommentMutation,
    useGetCommentsQuery,
    useChangeFavoriteMutation,
    // useAddToFavoriteMutation,
    // useRemoveFavoriteMutation,
    useGetFavoritesQuery,
    useIsFavoriteQuery,
    useSearchRecipeQuery,
    useAddActivityMutation
} = cookingForumApi;