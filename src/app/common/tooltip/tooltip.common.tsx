import { ReactNode, useState } from 'react'

interface TooltipProp {
  children: ReactNode
  title: string
  position?: 'top' | 'right' | 'bottom' | 'left'
  showArrow?: boolean
}

export function Tooltip({
  children,
  title,
  showArrow = true,
  position = 'top',
}: TooltipProp) {
  const [isShown, setIsShown] = useState<boolean>(false)
  return (
    <div className="tooltip-container">
      <div
        className={`tooltip ${
          isShown ? 'tooltip--shown' : ''
        } tooltip--${position}`}
      >
        <div className="tooltip-title">{title}</div>

        {showArrow && <div className="tooltip-arrow"></div>}
      </div>

      <div
        className="children"
        onMouseOver={() => {
          setIsShown(true)
        }}
        onMouseOut={() => {
          setIsShown(false)
        }}
      >
        {children}
      </div>
    </div>
  )
}
