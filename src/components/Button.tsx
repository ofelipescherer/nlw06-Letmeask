import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props : ButtonProps) {

  return(
    //os 3 pontos significam o spread operator, repassar todas as props
    <button className="button" {...props}>

    </button>
  )
}
