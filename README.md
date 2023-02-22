# react-smart-scroll

React lightweight, easy to use scroll typescript component. Built with [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) api, allows tracking scroll items position, state, visibility, scroll direction, etc. Could be used for list lazy loading, infinite scroll implementation, viewed items marking and so on.

## Installation
```shell
# with npm
npm install react-smart-scroll
```
```shell
# with yarn
yarn add react-smart-scroll
```


## Types
```typescript
interface IIntersectionData {
  scrollDirection: 'up' | 'down',
  entries: IntersectionObserverEntry[],
}
```

## Basic usage
```javascript
import SmartScroll from 'react-smart-scroll'

function App() {
  const someList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // Just for example. You can wrap any content you want

  const intersectionCallback = (data: IIntersectionData) => {
    console.log('Parent scroll callback : ', data)
  }

  return (
    <div className="App">
      <SmartScroll
        wrapperId="smartScrollContainer"
        intersectionCallback={ intersectionCallback }
      >
        { someList.map((item) => <div key={ item } className="listItem" data-index={ item }>
          ITEM : { item }
        </div>) }
      </SmartScroll>
    </div>
  )
}

export default App
```

## Props
| NAME                  | TYPE                              | DEFAULT          | DESCRIPTION |
|-----------------------|-----------------------------------|------------------|-------------------------------|
| wrapperId?            | String                            | rssListWrapper   | Main block id. Component starts tracking this block and its children for intersections           |
| intersectionCallback? | (scrollData: IScrollData) => any  | -                | Intersection event handler. Fires when child component intersect with main block and becomes hidden or visible   |
| callbackDelay?(ms)    | Number                            | 0                | Delay for calback function in milliseconds     |
| threshold?            | number, number[]                  | 0                | [Intersection Observer constructor](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) options param |
| rootMargin?           | String                            | -                | [Intersection Observer constructor](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) options param |

