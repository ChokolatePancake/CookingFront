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
    tagTypes: ['profile'],
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
            })
        }),
        stepAdd: builder.mutation({
            query: ({id, body}) => ({
                url: `/recipe/${id}/step/create`,
                method: 'POST',
                body: body
            })
        }),
        publishRecipe: builder.mutation({
            query: (id) => ({
                url: `/recipe/${id}/publish`,
                method: 'POST'
            })
        }),
        recipe: builder.query({
            query: (id) => ({
                url: `/recipe/${id}`,
                method: 'GET'
            })
        }),
        profileRecipes: builder.query({
            query: () => ({
                url: '/profile/recipes',
                method: 'GET'
            })
        })
    })
});


export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useProfileQuery,
    useProfileEditMutation,
    useRecipeAddMutation,
    useStepAddMutation,
    usePublishRecipeMutation,
    useRecipeQuery,
    useProfileRecipesQuery
} = cookingForumApi;