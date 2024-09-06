import './App.css';
import { RouterProvider } from '@tanstack/react-router';
import router from '@/app/router';

const App: React.FC = () => (
  <div className="App">
    <RouterProvider router={router} />
  </div>
);

export default App;
