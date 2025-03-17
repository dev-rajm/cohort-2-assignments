import Button from './Button';

function Card({ name, bio, interests, linkedIn, twitter }) {
  return (
    <div className="card">
      <h1>{name}</h1>
      <p>{bio}</p>
      <h4>Interests</h4>
      <ul>
        {interests?.map(interest => (
          <li>{interest}</li>
        ))}
      </ul>
      <Button link={linkedIn} name="LinkedIn" />
      <Button link={twitter} name="Twitter" />
    </div>
  );
}

export default Card;
