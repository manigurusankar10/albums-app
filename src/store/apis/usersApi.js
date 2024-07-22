import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/'
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        query: () => {
          return {
            url: '/users',
            method: 'GET'
          }
        },
        providesTags: (result, error) => {
          const tags = result.map(user => {
            return { type: 'User', id: user.id}
          });
          return tags;
        }
      }),
      addUser: builder.mutation({
        query: (user) => {
          return {
            url: '/users',
            method: 'POST',
            body: {
              name: faker.name.fullName(), // randomly generate name
            }
          }
        },
        invalidatesTags: (results, error, user) => {
          return [{ type: 'User', id: user.id }];
        }
      }),
      removeUser: builder.mutation({
        query: (user) => {
          return {
            url: `/users/${user.id}`,
            method: 'DELETE'
          }
        },
        invalidatesTags: (results, error, user) => {
          return [{ type: 'User', id: user.id }];
        }
      })
    };
  }
});

export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } = usersApi;
export { usersApi };