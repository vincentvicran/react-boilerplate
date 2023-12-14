'use client'

import React, { forwardRef } from 'react'

export const Button = forwardRef<HTMLButtonElement, Com.ButtonProps>(
  function ButtonComp({ title, prepend, append, className, ...rest }, ref) {
    return (
      <button ref={ref} className={`btn ${className}`} {...rest}>
        {prepend}
        {title}
        {append}
      </button>
    )
  },
)
