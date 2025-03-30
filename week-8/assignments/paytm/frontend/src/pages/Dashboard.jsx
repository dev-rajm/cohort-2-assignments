import { useEffect, useState } from 'react';
import Appbar from '../components/Appbar';
import Balance from '../components/Balance';
import Users from '../components/Users';
import axios from 'axios';

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/account/balance', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(resolve => {
        setBalance(resolve.data.balance), setMessage(resolve.data.message);
      });
  }, []);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
      {message && <div className="text-center">{message}</div>}
    </div>
  );
}

export default Dashboard;
