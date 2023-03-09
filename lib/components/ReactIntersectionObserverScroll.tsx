import React, { FC, ReactNode, useEffect, useRef } from 'react'

export interface IIntersectionData {
  scrollDirection: 'up' | 'down',
  entries: IntersectionObserverEntry[],
}
export interface IProps {
  wrapperId?: string,
  intersectionCallback?: (scrollData: IIntersectionData) => any,
  checkViewing?: boolean
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

const ReactIntersectionObserverScroll: FC<IProps> = ({
  wrapperId = 'rssListWrapper',
  intersectionCallback,
  callbackDelay = 0,
  children,
  checkViewing = false,
  // Intersection observer options
  threshold = 0,
  rootMargin,
}) => {
  const intersectionObserver = useRef<IntersectionObserver>()

  useEffect(() => {
    if (!mounted) {
      const wrapper = document.getElementById(wrapperId)

      if (!wrapper) return
      lastY = wrapper.scrollTop

      const observerCallBack = delay((entries: IntersectionObserverEntry[]): void => {
        if (intersectionCallback) {
          const data: IIntersectionData = { scrollDirection: lastY > wrapper.scrollTop ? 'up' : 'down', entries }

          if (checkViewing) {
            entries.forEach((entry: IntersectionObserverEntry) => {
              if (entry.isIntersecting) {
                intersectionObserver.current?.unobserve(entry.target)
              }
            })
          }

          lastY = wrapper.scrollTop
          intersectionCallback(data)
        }
      }, callbackDelay)

      intersectionObserver.current = new IntersectionObserver(observerCallBack, {
        root: wrapper,
        threshold,
        rootMargin,
      })

      for (const child of wrapper.children) {
        intersectionObserver.current.observe(child)
      }

      mounted = true
    }

    return () => {
      if (mounted) {
        mounted = false
        intersectionObserver.current?.disconnect()
      }
    }
  }, [])

  return (
    <div id={wrapperId} style={{ overflowY: 'auto' }}>
      { children }
    </div>
  )
}

export default ReactIntersectionObserverScroll
