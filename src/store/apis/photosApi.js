import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/'
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        query: (album) => {
          return {
            url: '/photos',
            params: {
              albumId: album.id
            },
            method: 'GET'
          }
        },
        providesTags: (result, error, album) => {
          const tags = result.map(photo => {
            return { type: 'Photo', id: photo.id}
          });
          tags.push({ type: 'AlbumPhotos', id: album.id });
          return tags;
        }
      }),
      addPhoto: builder.mutation({
        query: (album) => {
          return {
            url: '/photos',
            method: 'POST',
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true) // randomly generate image url
            }
          }
        },
        invalidatesTags: (results, error, album) => {
          return [{ type: 'AlbumPhotos', id: album.id }];
        }
      }),
      removePhoto: builder.mutation({
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: 'DELETE'
          }
        },
        invalidatesTags: (results, error, photo) => {
          return [{ type: 'Photo', id: photo.id }];
        }
      })
    };
  }
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation
} = photosApi;
export { photosApi };