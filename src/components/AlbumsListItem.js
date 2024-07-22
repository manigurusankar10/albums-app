import React from 'react'
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import { GoTrashcan } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import PhotoList from './PhotoList';

export default function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();
  const handleRemoveAlbum = () => {
    removeAlbum(album);
  };

  const header = <>
    <Button className="mr-2" onClick={handleRemoveAlbum} loading={results.isLoading}>
      <GoTrashcan />
    </Button>
    {album.title}
  </>;

  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotoList album={album} />
    </ExpandablePanel>
  )
}
