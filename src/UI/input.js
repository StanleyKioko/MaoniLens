import React, { forwardRef, useState } from 'react';

// Base Input Component
const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  className = '',
  inputClassName = '',
  labelClassName = '',
  fullWidth = false,
  size = 'medium',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-3 py-2 text-sm',
    large: 'px-4 py-3 text-base'
  };

  const baseInputClasses = `
    block border rounded-lg transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-kenya-green focus:border-transparent
    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400'}
    ${fullWidth ? 'w-full' : ''}
    ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''}
    ${inputClassName}
  `;

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {/* Label */}
      {label && (
        <label className={`
          block text-sm font-medium text-gray-700 mb-1
          ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ''}
          ${labelClassName}
        `}>
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className={`
            absolute top-1/2 transform -translate-y-1/2 text-gray-400
            ${iconPosition === 'left' ? 'left-3' : 'right-3'}
            ${isFocused ? 'text-kenya-green' : ''}
          `}>
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={baseInputClasses}
          {...props}
        />
      </div>

      {/* Helper Text / Error */}
      {(error || helperText) && (
        <p className={`mt-1 text-xs ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Textarea Component
export const Textarea = forwardRef(({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  disabled = false,
  required = false,
  rows = 4,
  resize = 'vertical',
  className = '',
  textareaClassName = '',
  labelClassName = '',
  fullWidth = false,
  maxLength,
  showCharCount = false,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
  };

  const baseTextareaClasses = `
    block w-full px-3 py-2 border rounded-lg transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-kenya-green focus:border-transparent
    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400'}
    ${resizeClasses[resize]}
    ${textareaClassName}
  `;

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const characterCount = value ? value.length : 0;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {/* Label */}
      {label && (
        <label className={`
          block text-sm font-medium text-gray-700 mb-1
          ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ''}
          ${labelClassName}
        `}>
          {label}
        </label>
      )}

      {/* Textarea */}
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={baseTextareaClasses}
        {...props}
      />

      {/* Helper Text / Error / Character Count */}
      <div className="flex justify-between items-center mt-1">
        <div className="flex-1">
          {(error || helperText) && (
            <p className={`text-xs ${error ? 'text-red-600' : 'text-gray-500'}`}>
              {error || helperText}
            </p>
          )}
        </div>
        {showCharCount && maxLength && (
          <p className={`text-xs ${
            characterCount > maxLength * 0.9 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {characterCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

// Select Component
export const Select = forwardRef(({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  selectClassName = '',
  labelClassName = '',
  fullWidth = false,
  size = 'medium',
  ...props
}, ref) => {
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-3 py-2 text-sm',
    large: 'px-4 py-3 text-base'
  };

  const baseSelectClasses = `
    block border rounded-lg transition-colors duration-200 bg-white
    focus:outline-none focus:ring-2 focus:ring-kenya-green focus:border-transparent
    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400'}
    ${fullWidth ? 'w-full' : ''}
    ${selectClassName}
  `;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {/* Label */}
      {label && (
        <label className={`
          block text-sm font-medium text-gray-700 mb-1
          ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ''}
          ${labelClassName}
        `}>
          {label}
        </label>
      )}

      {/* Select */}
      <select
        ref={ref}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={baseSelectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>

      {/* Helper Text / Error */}
      {(error || helperText) && (
        <p className={`mt-1 text-xs ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

// Search Input Component
export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  onSearch,
  onClear,
  className = '',
  ...props
}) => {
  const handleClear = () => {
    if (onChange) onChange({ target: { value: '' } });
    if (onClear) onClear();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyPress={handleKeyPress}
      icon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      }
      iconPosition="left"
      className={className}
      inputClassName={value ? 'pr-10' : ''}
      {...props}
    >
      {/* Clear button */}
      {value && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </Input>
  );
};

export default Input;