import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";
import cn from 'classnames'

export default function Button({children, className ,...props}: ButtonProps) {
  return (
   <button className={cn(styles['button'], styles['accent'], className)} {...props}>{children}</button>
  )
}
