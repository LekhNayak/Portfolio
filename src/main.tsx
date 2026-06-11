import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/global.scss';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

// NOTE: intentionally not wrapped in <StrictMode> — the imperative WebGL scene
// and GSAP loops are mounted via effects, and dev-mode double-invocation would
// thrash the renderer. Cleanup is still fully implemented for real unmounts.
createRoot(container).render(<App />);
