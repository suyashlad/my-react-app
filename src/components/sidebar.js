import { useState } from 'react';
import { FaHome, FaSearch, FaFolderOpen, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: '/icons/home.png', to: '/dashboard' },
    { name: 'Search', icon: '/icons/search.png', to: '/search' },
    { name: 'My Files', icon: '/icons/files.png', to: '/files' },
    { name: 'Profile', icon: '/icons/user.png', to: '/profile' },
  ];

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`h-screen bg-white shadow-md border-r transition-all duration-300 ${
        isExpanded ? 'w-56' : 'w-16'
      } fixed z-10`}
    >
      <div className="flex items-center justify-center h-16 border-b m-3 mt-4" >
        {isExpanded ? (
          <span className="text-xl font-bold tracking-wide ml-3"><img src="/logo-login.png"></img></span>
        ) : (
          <span className="text-xl font-bold"><img src="/logo_small.png"></img></span> // Placeholder for logo
        )}
      </div>

      <ul className="mt-4 list-none p-0 m-0">
  {menuItems.map((item) => (
    <li key={item.name}>
      <Link
        to={item.to}
        className={`flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-100 ${
          location.pathname === item.to ? 'bg-gray-100 font-semibold' : ''
        }`}
      >
        <img src={item.icon} alt={`${item.name} icon`} className="w-6 h-6" />
        {isExpanded && <span>{item.name}</span>}
      </Link>
    </li>
  ))}
</ul>

    </div>
  );
};

export default Sidebar;
