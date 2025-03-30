import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import Input from '../components/Input';
import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    const res = await axios.post('http://localhost:3000/api/v1/user/signup', {
      firstName,
      lastName,
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
          <Heading label={'Sign up'} />
          <SubHeading label={'Enter your information to create an account'} />
          <Input
            label={'First Name'}
            placeholder={'John'}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            label={'Last Name'}
            placeholder={'Deo'}
            onChange={e => setLastName(e.target.value)}
          />
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
            <Button label={'Sign up'} onClick={handleClick} />
          </div>
          <ButtonWarning
            label={'Already have an account?'}
            buttonText={'Sign in'}
            to={'/signin'}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
