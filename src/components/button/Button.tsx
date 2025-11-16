import * as React from 'react';

export interface ButtonProps {
  label?: string;
  variant?: 'Enabled' | 'Disabled' | 'Hover';
  size?: 'Small' | 'Medium' | 'Large';
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function Button({
  label,
  variant = 'Enabled',
  size = 'Medium',
  disabled = false,
  children,
}: ButtonProps) {
  const baseStyles = {
    padding: size === 'Small' ? '8px 16px' : size === 'Large' ? '16px 32px' : '12px 24px',
    fontSize: size === 'Small' ? '14px' : size === 'Large' ? '18px' : '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: disabled || variant === 'Disabled' ? 'not-allowed' : 'pointer',
    opacity: disabled || variant === 'Disabled' ? 0.6 : 1,
    backgroundColor: variant === 'Hover' ? '#0056b3' : '#007bff',
    color: '#ffffff',
    transition: 'background-color 0.2s',
  };

  return (
    <button
      style={baseStyles}
      disabled={disabled || variant === 'Disabled'}
      onMouseEnter={(e) => {
        if (!disabled && variant !== 'Disabled') {
          e.currentTarget.style.backgroundColor = '#0056b3';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant !== 'Disabled') {
          e.currentTarget.style.backgroundColor = '#007bff';
        }
      }}
    >
      {children || label || 'Button'}
    </button>
  );
}

