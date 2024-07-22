import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation(user);

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  if (isFetching) {
    return (
      <Skeleton className="h-10 w-full" times={3} />
    )
  };

  if (error) {
    return (
      <div>Error loading albums.</div>
    )
  }
  
  return (
    <>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button
          onClick={handleAddAlbum}
          loading={results.isLoading}>
          + Add Album
        </Button>
      </div>
      <div>
        {data.map(album => {
          return <AlbumsListItem key={album.id} album={album} />
        })}
      </div>  
    </>
  );
}

export default AlbumsList;
