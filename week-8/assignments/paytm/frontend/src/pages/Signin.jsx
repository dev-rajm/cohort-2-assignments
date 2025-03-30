import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';
import Heading from '../components/Heading';
import Input from '../components/Input';
import SubHeading from '../components/SubHeading';

function Signin() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={'Sign in'} />
          <SubHeading label={'Enter your information to create an account'} />
          <Input label={'Email'} placeholder={'example@gmail.com'} />
          <Input label={'password'} placeholder={'john1234'} />
          <div className="pt-4">
            <Button label={'Sign in'} />
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
