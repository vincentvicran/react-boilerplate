import {colors} from 'src/modules'
// import { colors, fonts } from "../constants";

const MenuContainer = (props: Com.Menu.MenuProps) => {
  const {children, className, ...rest} = props
  return (
    <div className={`menu-container ${className}`} {...rest}>
      {children}
    </div>
  )
}

const MenuItem = (props: Com.Menu.MenuItemProps) => {
  const {children, danger = false, className, style, ...rest} = props
  return (
    <button
      className={`menu-item ${className}`}
      style={{
        color: danger ? colors.base.critical : colors.defaultTextColor,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

const MenuSeparator = () => {
  return <div className="menu-separator" />
}

export const Menu = {
  Container: MenuContainer,
  Item: MenuItem,
  Separator: MenuSeparator,
}
