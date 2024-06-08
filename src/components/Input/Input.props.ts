import {InputHTMLAttributes} from 'react'

export interface inputProps extends InputHTMLAttributes<HTMLInputElement>{
  isValid?: boolean
}