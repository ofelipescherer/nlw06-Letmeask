import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
 { isOutlined?: boolean};

export function Button({ isOutlined = false, ...props }: ButtonProps) {

  return(
    //os 3 pontos significam o spread operator, repassar todas as props
    <button 
    className={`button ${isOutlined ? 'outlined' : ''}`}
    {...props}>

    </button>
  )
}
