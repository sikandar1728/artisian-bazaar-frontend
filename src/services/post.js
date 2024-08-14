import baseApi from './baseApi';

export const postsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: ({ token, caption, image }) => ({
                url: '/api/createpost',
                method: 'POST',
                body: { caption, image },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
        getMyPosts: builder.mutation({
            query: ({ token }) => ({
                url: '/api/myPosts',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }),
        getPostOfFloowing: builder.mutation({
            query: ({ token }) => ({
                url: '/api/postsoffollowing',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }),
        getUserPosts: builder.mutation({
            query: ({ username, token }) => ({
                url: `/api/userPosts/${username}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }),
    }),
});

export const { useCreatePostMutation, useGetMyPostsMutation, useGetPostOfFloowingMutation, useGetUserPostsMutation } = postsApi;