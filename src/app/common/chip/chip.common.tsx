import {colors} from 'src/modules'

export const Chip = ({color, title, style, ...rest}: Com.ChipProps) => {
  return (
    <div
      className="chip-container"
      style={{backgroundColor: color ?? colors.grey100}}
      {...rest}
    >
      <div className="chip" style={style}>
        {title}
      </div>
    </div>
  )
}
