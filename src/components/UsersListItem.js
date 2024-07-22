import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import { useRemoveUserMutation } from '../store';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

function UsersListItem({ user }) {
  const [removeUser, results] = useRemoveUserMutation();
  const handleRemoveUser = () => {
    removeUser(user);
  };

  const header = (
    <>
      <Button className="mr-3" loading={results.isLoading} onClick={handleRemoveUser}>
        <GoTrashcan />
      </Button>
      {results.error && <div>Error deleting user.</div>}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
