import styles from './Input.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';
import { inputProps } from './Input.props';

// Объявляем компонент `Input`, оборачивая его в `forwardRef`
const Input = forwardRef<HTMLInputElement, inputProps>(function Input({ isValid = true,  className, ...props }, ref) {
  return (
    // Используем реф на элементе `input`
    <input 
      ref={ref} 
      className={cn(styles['input'], className, {
        [styles['invalid']]: isValid
      })} 
      {...props} 
    />
  );
});

export default Input;
