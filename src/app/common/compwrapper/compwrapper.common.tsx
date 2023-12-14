import { motion } from 'framer-motion'
import { useAuth } from '../../routing'
import { Header } from '../header/header.common'

export const CompWrapper = ({
  children,
  style,
  ...rest
}: Com.CompWrapperProps) => {
  const { sidenavExpand } = useAuth()
  const paddingLeft = { paddingLeft: sidenavExpand ? 300 : 110 }

  return (
    <motion.div className="compwrapper-container" animate={paddingLeft}>
      <Header />
      <div className="compwrapper" style={style} {...rest}>
        {children}
      </div>
    </motion.div>
  )
}
