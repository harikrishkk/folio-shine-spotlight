# Memory leak forensics in production

Memory leaks in React rarely come from React itself — they come from
subscriptions, closures, and detached DOM nodes. We hunt them down.

## What we cover

- Chrome DevTools heap snapshots and the **3-snapshot technique**
- Common offenders: stale event listeners, `useEffect` cleanups, observers
- Detached DOM nodes and what keeps them alive
- Production monitoring with `performance.memory` and PerformanceObserver
- Writing a leak-regression test

## Example: a leak that hides in plain sight

```tsx
useEffect(() => {
  const onResize = () => setSize(window.innerWidth);
  window.addEventListener('resize', onResize);
  // forgot the cleanup → every navigation away leaks a listener
}, []);
```

You leave with a checklist your team can run before every release.