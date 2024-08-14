import baseApi from './baseApi';

export const userAuthApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: (body) => ({
                url: '/api/signin',
                method: 'POST',
                body,
            }),
        }),
        userRegister: builder.mutation({
            query: (body) => ({
                url: '/api/signup',
                method: 'POST',
                body
            })
        }),
        forgotPassword: builder.mutation({
            query: (body) => ({
                url: '/api/sendloginlink',
                method: 'POST',
                body
            })
        }),
        verifyResetPasswordLink: builder.mutation({
            query: ({ id, token }) => ({
                url: `/api/resetPassword/${id}/${token}`,
                method: 'GET',
            })
        }),
        resetPassword: builder.mutation({
            query: ({ data, id, token }) => ({
                url: `/api/${id}/${token}`,
                method: 'POST',
                body: data
            })
        }),
        editProfile: builder.mutation({
            query: ({ email, name, username, avatar, token }) => ({
                url: `/api/updateProfile`,
                method: 'PUT',
                body: { email, name, username, avatar },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }),
        deleteMyProfile: builder.mutation({
            query: ({ token }) => ({
                url: `/api/deleteProfile`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }),
        loadUser: builder.mutation({
            query: ({ token }) => ({
                url: `/api/user`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }),
        getAllUsers: builder.mutation({
            query: ({ token }) => ({
                url: `/api/allUsers`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }),
        followUnfollowUser: builder.mutation({
            query: ({ id, token }) => ({
                url: `/api/followUnfollowUser/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }),
        getUserProfile: builder.mutation({
            query: ({ username, token }) => ({
                url: `/api/userProfile/${username}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }),
    }),
});

export const { useUserLoginMutation, useUserRegisterMutation, useForgotPasswordMutation, useVerifyResetPasswordLinkMutation, useResetPasswordMutation, useLoadUserMutation, useEditProfileMutation, useDeleteMyProfileMutation, useGetAllUsersMutation, useFollowUnfollowUserMutation, useGetUserProfileMutation } = userAuthApi;

