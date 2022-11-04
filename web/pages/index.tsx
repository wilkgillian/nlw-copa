import axios from 'axios';
import { GetServerSideProps } from 'next';

interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {
  return <h1>conatgem: {props.count}</h1>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get('http://localhost:3333/pools/count');
  console.log(data);
  return {
    props: {
      count: data.count
    }
  };
};
