import { useEffect, useState } from 'react';
import User from './User';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  const getBalance = async filter => {
    const res = await axios.get(
      `http://localhost:3000/api/v1/user/bulk?filter=${filter}`
    );
    setUsers(res.data.user);
  };

  useEffect(() => {
    getBalance(filter);
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <div>
        {users.map(user => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </>
  );
}

export default Users;
