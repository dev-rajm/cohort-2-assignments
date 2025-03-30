import { useNavigate } from 'react-router-dom';
import Button from './Button';

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full size-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl uppercase">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full capitalize">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="flex flex-col h-full justify-center">
        <Button
          label={'Send Money'}
          onClick={() =>
            navigate(`/send?id=${user._id}&name=${user.firstName}`)
          }
        />
      </div>
    </div>
  );
}

export default User;
