import { ButtonProps } from "./Button.props";
import "./Button.module.css";
import cn from 'classnames'

export default function Button({children, className ,...props}: ButtonProps) {
  return (
   <button className={cn("button accent", className)} {...props}>{children}</button>
  )
}
