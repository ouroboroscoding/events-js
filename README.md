# @ouroboros/events
[![npm version](https://img.shields.io/npm/v/@ouroboros/events.svg)](https://www.npmjs.com/package/@ouroboros/events) ![MIT License](https://img.shields.io/npm/l/@ouroboros/events.svg)

A library to give the ability to subscribe to and trigger synchronous events in
javascript. Useful for passing data around a project without creating import
conflicts / circular dependencies.

## Installation
npm
```bash
npm install @ouroboros/events
```

## Getting Started
Import events into your code

```jsx
import events from '@ouroboros/events';
```

Subscribing and unsubscribing in a React useEffect hook:

```jsx
export default function App() {
  useEffect(() => {
    const headerClick = (element) => {
      alert(`Header ${element} element was clicked!`)
    }
    events.get('header').subscribe(headerClick);
    return () => {
      events.get('header').unsubscribe(headerClick');
    }
  }, []);

  return (
    <Header />
  )
}
```

It is not required to name or store your callbacks, as `subscribe` will also
return an object with an unsubscribe function, making the following effectively
the same as above.

```jsx
function ElementClick({ }) {
  const [ element, setElement ] = useState(false);
  useEffect(() => {
    const e = events.get('header').subscribe(setElement);
    return () => {
      e.unsubscribe();
    }
  }, []);
  if(!element) {
    return null;
  }
  return <span>Header {element} element was clicked!</span>
}
```

Triggering an event from another component:

```jsx
export default function Header(props) {
  return (
    <div onClick={() => {
      events.get('header').trigger('div');
    }}>
      <p onClick={() => {
        events.get('header').trigger('p');
      }}>Header Content</p>
    </div>
  );
}
```

## Immediate triggers
If you ever run into the issue of triggers being fired off before your component
is able to subscribe, you can use `lastArgs`, the last set of arguments to
trigger, via the return from `subscribe`.

```jsx
  useEffect(() => {
    const e = events.get('header').subscribe(setElement);
    if(e.lastArgs !== null) {
      setElement(e.lastArgs[0]);
    }
    return () => {
      e.unsubscribe();
    }
  }, []);
```

## Triggering
The `trigger` function has no set number of arguments, but instead excepts a
variable length of them, all of which will be passed to any subscription
callback. This works in JavaScript because it's up to you if you want to use
the data or not.

For example, we could change the above example to the following

```jsx
export default function Header(props) {
  return (
    <div onClick={() => {
      events.get('header').trigger('div');
    }}>
      <p onClick={() => {
        events.get('header').trigger('p', 'div');
      }}>
        <b onClick={() => {
          events.get('header').trigger('b', 'p', 'div');
        }}>Header Content</b>
      </p>
    </div>
  );
}
```

And our original callback with only one argument would still work without issue,
but if you ever wanted to extend it, you could add a second variable to store
the parent:

```jsx
  useEffect(() => {
    const e = events.get('header').subscribe((element, parent) => {
      if(parent) {
        alert(`Header ${element} of ${parent} was clicked!`)
      } else {
        alert(`Header ${element} element was clicked!`)
      }
    });
    return () => {
      e.unsubscribe();
    }
  }, []);
```

...or switch completey to your own variable length callback.

```jsx
  useEffect(() => {
    const e = events.get('header').subscribe(() => {
      const reverse = arguments.slice().reverse();
      alert(`Header ${reverse.join(' -> ')} element was clicked!`)
    });
    return () => {
      e.unsubscribe();
    }
  }, []);
```

