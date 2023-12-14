import React, {useLayoutEffect, useState} from 'react'

import {createPortal} from 'react-dom'
// import { uid } from '../../../../utils';

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)

  return wrapperElement
}

interface ReactPortalProps {
  children: React.ReactNode
  wrapperId?: string
}
export const ReactPortal = ({
  children,
  wrapperId = 'react-portal-wrapper',
}: ReactPortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false

    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBody(wrapperId)
    }

    setWrapperElement(element)

    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode) {
        element.remove()
      }
    }
  }, [wrapperId])

  if (wrapperElement === null) return null

  return createPortal(children, wrapperElement)
}
