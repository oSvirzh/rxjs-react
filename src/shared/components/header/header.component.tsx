import { Link } from '@tanstack/react-router';

export const Header = () => (
  <header className="bg-blue-900 p-4 text-center text-white">
    <nav>
      <Link to="/" className="[&.active]:font-bold [&:not(:first-child)]:ml-4">
        Home
      </Link>
    </nav>
  </header>
);
