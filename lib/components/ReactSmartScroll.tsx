import React, { FC, ReactNode, useEffect } from 'react'

export interface IScrollData {
  scrollDirection: 'up' | 'down',
  entries: IntersectionObserverEntry[],
}
export interface IProps {
  wrapperId?: string,
  scrollCallback?: (scrollData: IScrollData) => any,
  callbackDelay?: number,
  children: ReactNode[],
  // Intersection observer options
  rootMargin?: string,
  threshold?: number | number[]
}

let mounted = false
let lastY = 0

export const delay = (f: (args: IntersectionObserverEntry[]) => void, t: number) => {
  let timeoutId: number | null = null

  return (args: IntersectionObserverEntry[]) => {
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => { f(args) }, t) as unknown as number
  }
}

const ReactSmartScroll: FC<IProps> = ({
  wrapperId = 'rssListWrapper',
  scrollCallback,
  callbackDelay = 0,
  children,
  // Intersection observer options
  threshold = 0,
  rootMargin,
}) => {

  useEffect(() =>{
    if (!mounted) {
      const wrapper = document.getElementById(wrapperId)

      if (!wrapper) return
      lastY = wrapper.scrollTop

      const observerCallBack = delay((entries: IntersectionObserverEntry[]): void => {
        if (scrollCallback) {
          const data: IScrollData = { scrollDirection: lastY > wrapper.scrollTop ? 'up' : 'down', entries }

          lastY = wrapper.scrollTop
          scrollCallback(data)
        }
      }, callbackDelay)

      const observer = new IntersectionObserver(observerCallBack, {
        root: wrapper,
        threshold,
        rootMargin,
      })

      for (const child of wrapper.children) {
        observer.observe(child)
      }

      mounted = true
    }
  }, [])

  return (
    <div id={wrapperId} style={{ overflowY: 'auto' }}>
      { children }
    </div>
  )
}

export default ReactSmartScroll
