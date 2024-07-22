import React from 'react'
import { useAddPhotoMutation, useFetchPhotosQuery } from '../store';
import Button from './Button';
import PhotoListItem from './PhotoListItem';
import Skeleton from './Skeleton';

export default function PhotoList({ album }) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  if (isFetching) {
    return (
      <Skeleton className="h-8 w-8" times={4} />
    )
  };

  if (error) {
    return (
      <div>Error loading albums.</div>
    )
  }

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Photos in {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>

      <div className='mx-8 flex flex-row flex-wrap justify-center'>
        {data.map(photo => {
          return <PhotoListItem key={photo.id} photo={photo} />
        })}
      </div>
    </div>
  )
}
