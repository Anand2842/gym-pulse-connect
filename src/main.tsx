
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createDemoUsers } from './utils/createDemoUsers';

// Create demo users for development (this won't run in production)
if (import.meta.env.DEV) {
  createDemoUsers()
    .then(() => console.log('Demo users setup completed or already exists'))
    .catch(err => console.error('Error setting up demo users:', err));
}

createRoot(document.getElementById("root")!).render(<App />);
