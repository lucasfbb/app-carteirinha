import './gesture-handler';
import Routes from './src/routes';
import { useFonts } from 'expo-font';

export default function App() {

  const [loaded] = useFonts({
    NeueMachina: require('./assets/fonts/NeueMachina-Regular.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Routes />
  );
}
