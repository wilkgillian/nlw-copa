import { VStack, Heading } from 'native-base';
import { Header } from '../components/Header';
import Logo from '../assets/logo.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default function Find() {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar bolão" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre seu bolão através do seu código único
        </Heading>
        <Input mb={2} placeholder="Qual o código do bolão?" />
        <Button title="buscar bolão" />
      </VStack>
    </VStack>
  );
}
