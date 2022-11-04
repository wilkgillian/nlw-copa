import { GetServerSideProps } from 'next';
import Image from 'next/image';
import ImageApp from '../assets/app-nlw-copa-preview.png';
import Logo from '../assets/logo.svg';
import Users from '../assets/users-avatar-example.png';
import IconCheck from '../assets/icon-check.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';

interface HomeProps {
  poolCount: number;
  usersCount: number;
  guessesCount: number;
}

export default function Home(props: HomeProps) {
  const [poolName, setPoolName] = useState('');

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolName
      });
      const { code } = response.data;

      await navigator.clipboard.writeText(code);
      alert(
        'Bolão criado com sucesso os código foi copiado para área de transferência'
      );
      setPoolName('');
    } catch (error) {
      console.log(error);
      alert('Falha ao criar bolão');
    }
  }
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={Logo} alt="logo nlw copa" quality={100} />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div className="mt-10 flex items-center gap-2">
          <Image src={Users} alt="usuários app nlw copa" quality={100} />
          <strong className="text-gray-100 text-xl">
            <span className="text-green">+{props.usersCount}</span> pessoas já
            estão usando.
          </strong>
        </div>
        <form className="mt-10 flex gap-2" onSubmit={createPool}>
          <input
            value={poolName}
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            onChange={e => setPoolName(e.target.value)}
          />
          <button
            className="bg-yellow-900 px-6 py-4 rounded font-bold text-gray-900 text-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀.
        </p>
        <div className="mt-10 pt-10 border-t border-gray-600 flex center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={IconCheck} alt="check icon" />
            <div className="flex flex-col ">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600" />
          <div className="flex items-center gap-6">
            <Image src={IconCheck} alt="check icon" />
            <div className="flex flex-col ">
              <span className="font-bold text-2xl">+{props.guessesCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image src={ImageApp} alt="app nlw copa" quality={100} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [poolCountResponse, usersCountResponse, guessesCountResponse] =
    await Promise.all([
      api.get('pools/count'),
      api.get('users/count'),
      api.get('guesses/count')
    ]);
  return {
    props: {
      poolCount: poolCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count
    }
  };
};
