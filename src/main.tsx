import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles.css';
import Index from '@/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Index />
  </StrictMode>
);
