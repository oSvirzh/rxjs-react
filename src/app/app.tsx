import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import router from '@/app/router';

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
