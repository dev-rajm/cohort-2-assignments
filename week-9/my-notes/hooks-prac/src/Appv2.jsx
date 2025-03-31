import useSWR from 'swr';
import './App.css';

const fetcher = async function (url) {
  const data = await fetch(url);
  const json = await data.json();
  return json;
};

function Profile() {
  const { data, error, isLoading } = useSWR(
    'https://sum-server.100xdevs.com/todos',
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return <div>Hello, you have {data.todos.length} todos.</div>;
}

function App() {
  return (
    <>
      <Profile />
    </>
  );
}

export default App;
