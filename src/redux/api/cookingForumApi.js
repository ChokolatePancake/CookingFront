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
                url: '/register',
                method: 'POST',
                body: body,
            }),
        }),
    })
});


export const {
    useRegisterUserMutation
} = cookingForumApi;