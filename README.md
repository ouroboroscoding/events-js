# @ouroboros/events

[![npm version](https://img.shields.io/npm/v/@ouroboros/events.svg)](https://www.npmjs.com/package/@ouroboros/events) ![MIT License](https://img.shields.io/npm/l/@ouroboros/events.svg)

A library to give the ability to subscribe to and trigger synchronous events in javascript. Useful for passing data around a project without creating import conflicts / circular dependencies.

## Installation
npm
```bash
npm install @ouroboros/events
```

## Getting Started

Import events into your code

```javascript
import events from '@ouroboros/events';
```

Subscribing and unsubscribing in a React useEffect hook:

```javascript
export default function App() {
    useEffect(() => {
        const headerClick = (element) => {alert(`Header ${element} element was clicked!`)}
        events.subscribe('header', headerClick);
        return () => {
            events.unsubscribe('header', headerClick');
        }
    }, []);

    return (
        <Header />
    )
}
```

Triggering an event from another component:

```javascript
export default function Header(props) {
    return (
        <div onClick={() => {
            events.trigger('header', 'div');
        }}>
            <p onClick={() => {
                events.trigger('header', 'p');
            }}>Header Content</p>
        </div>
    );
}
```
