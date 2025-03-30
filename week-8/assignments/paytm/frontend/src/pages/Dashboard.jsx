import { useEffect, useState } from 'react';
import Appbar from '../components/Appbar';
import Balance from '../components/Balance';
import Users from '../components/Users';
import axios from 'axios';

function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/account/balance', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(resolve => setBalance(resolve.data.balance));
  }, []);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
