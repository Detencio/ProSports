import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { 
  Bars3Icon, 
  BellIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
  user: any;
}

/**
 * Componente Header con navegación y menú de usuario
 */
const Header: React.FC<HeaderProps> = ({ onMenuClick, user }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Botón de menú para móvil */}
        <button
          type="button"
          className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={onMenuClick}
        >
          <span className="sr-only">Abrir menú</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Logo y título */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            ProSports
          </h1>
        </div>

        {/* Navegación derecha */}
        <div className="flex items-center gap-4">
          {/* Notificaciones */}
          <button
            type="button"
            className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <span className="sr-only">Ver notificaciones</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          </button>

          {/* Menú de usuario */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              <span className="sr-only">Abrir menú de usuario</span>
              <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/profile"
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      Mi Perfil
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/settings"
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      Configuración
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                    >
                      Cerrar Sesión
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header; 