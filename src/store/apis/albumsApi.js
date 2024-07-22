import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/'
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        query: (user) => {
          return {
            url: '/albums',
            params: {
              userId: user.id
            },
            method: 'GET'
          }
        },
        providesTags: (result, error, user) => {
          const tags = result.map(album => {
            return { type: 'Album', id: album.id}
          });
          tags.push({ type: 'UsersAlbums', id: user.id });
          return tags;
        }
      }),
      addAlbum: builder.mutation({
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName() // randomly generate title
            }
          }
        },
        invalidatesTags: (results, error, user) => {
          return [{ type: 'UsersAlbums', id: user.id }];
        }
      }),
      removeAlbum: builder.mutation({
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE'
          }
        },
        invalidatesTags: (results, error, album) => {
          return [{ type: 'Album', id: album.id }];
        }
      })
    };
  }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };