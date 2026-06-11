import { SceneBindingsProvider } from '@/context/SceneBindingsContext';
import { Home } from '@/pages/Home';

export function App() {
  return (
    <SceneBindingsProvider>
      <Home />
    </SceneBindingsProvider>
  );
}
