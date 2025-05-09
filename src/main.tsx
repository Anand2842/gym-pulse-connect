
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createDemoUsers } from './utils/createDemoUsers';
import { toast } from './components/ui/use-toast';

// Create demo users for development (this won't run in production)
if (import.meta.env.DEV) {
  createDemoUsers()
    .then(() => {
      console.log('Demo users setup completed or already exists');
      
      // Add a small delay to show toast after app is mounted
      setTimeout(() => {
        toast({
          title: "Demo Mode Active",
          description: "Demo users (admin@example.com and member@example.com) are available for testing with password: 'password'",
          duration: 8000,
        });
      }, 1000);
    })
    .catch(err => console.error('Error setting up demo users:', err));
}

createRoot(document.getElementById("root")!).render(<App />);
