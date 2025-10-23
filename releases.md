# @ouroboros/events releases

## 1.1.3
- Switched from calling subscribers immediately upon trigger, to firing off at the end of the javascript event loop.

## 1.1.2
- `EventReturn` from `subscribe()` now contains `lastArgs` which might be undefined if no trigger has been called yet.

## 1.1.1
- Updated documentation to match changes in 1.0.0 and provide more examples.

## 1.1.0
- Re-structured the project so that JavaScript files are in a seperate directory called **build**.

## 1.0.1
- Fixed bug in the `EventCallback` type.

## 1.0.0
- Overhauled old 0.1.0 version which was pure functions to be more class based.