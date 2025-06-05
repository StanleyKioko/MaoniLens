import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-kenya-green text-white hover:bg-green-700 focus:ring-green-500 shadow-md hover:shadow-lg',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-md hover:shadow-lg',
    outline: 'border-2 border-kenya-green text-kenya-green hover:bg-kenya-green hover:text-white focus:ring-green-500',
    ghost: 'text-kenya-green hover:bg-green-50 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-md hover:shadow-lg',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 shadow-md hover:shadow-lg',
    info: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg'
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
    xlarge: 'px-8 py-4 text-lg'
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <LoadingSpinner size="small" color="white" className="mr-2" />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

// Button Group Component
export const ButtonGroup = ({ children, className = '', orientation = 'horizontal' }) => {
  const orientationClasses = {
    horizontal: 'flex space-x-2',
    vertical: 'flex flex-col space-y-2'
  };

  return (
    <div className={`${orientationClasses[orientation]} ${className}`}>
      {children}
    </div>
  );
};

// Icon Button Component
export const IconButton = ({
  icon,
  onClick,
  variant = 'ghost',
  size = 'medium',
  disabled = false,
  className = '',
  ariaLabel,
  ...props
}) => {
  const sizeClasses = {
    small: 'p-1',
    medium: 'p-2',
    large: 'p-3'
  };

  return (
    <Button
      variant={variant}
      size="medium"
      disabled={disabled}
      onClick={onClick}
      className={`${sizeClasses[size]} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </Button>
  );
};

// Floating Action Button
export const FAB = ({
  icon,
  onClick,
  position = 'bottom-right',
  className = '',
  ariaLabel,
  ...props
}) => {
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6'
  };

  return (
    <Button
      variant="primary"
      className={`
        ${positionClasses[position]}
        w-14 h-14 rounded-full shadow-lg hover:shadow-xl
        z-50 transition-transform hover:scale-110
        ${className}
      `}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </Button>
  );
};

export default Button;