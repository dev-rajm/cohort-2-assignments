import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';
import Heading from '../components/Heading';
import Input from '../components/Input';
import SubHeading from '../components/SubHeading';
import { useState } from 'react';
import axios from 'axios';

function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    const res = await axios.post('http://localhost:3000/api/v1/user/signin', {
      username,
      password,
    });
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={'Sign in'} />
          <SubHeading label={'Enter your information to create an account'} />
          <Input
            label={'Email'}
            placeholder={'example@gmail.com'}
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            label={'password'}
            placeholder={'john1234'}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button label={'Sign in'} onClick={handleClick} />
          </div>
          <ButtonWarning
            label={"Don't have an account?"}
            buttonText={'Sign up'}
            to={'/signup'}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
