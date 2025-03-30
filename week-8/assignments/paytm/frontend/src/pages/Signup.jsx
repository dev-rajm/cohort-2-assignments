import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import Input from '../components/Input';
import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';

function Signup() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={'Sign up'} />
          <SubHeading label={'Enter your information to create an account'} />
          <Input label={'First Name'} placeholder={'John'} />
          <Input label={'Last Name'} placeholder={'Deo'} />
          <Input label={'Email'} placeholder={'example@gmail.com'} />
          <Input label={'password'} placeholder={'john1234'} />
          <div className="pt-4">
            <Button label={'Sign up'} />
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
