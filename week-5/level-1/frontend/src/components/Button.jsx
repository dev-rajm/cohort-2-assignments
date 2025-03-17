function Button({ link, name }) {
  return (
    <button className="btn" role="link" href={link}>
      {name}
    </button>
  );
}

export default Button;
