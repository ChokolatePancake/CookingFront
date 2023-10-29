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
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body: body,
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
            })
        })
    })
});


export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useProfileQuery
} = cookingForumApi;