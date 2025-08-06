import React from 'react';

/**
 * Componente de spinner de carga
 * Muestra un indicador de carga animado usando Tailwind CSS
 */
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <span className="ml-3 text-lg text-gray-600">Cargando...</span>
    </div>
  );
};

export default LoadingSpinner; 