# Concurrent mode internals

React 18 didn't just add new APIs — it rewrote the scheduler. We open the
hood and trace a render from `setState` to commit.

## What we cover

- The fiber tree and the two-pass render/commit model
- Lanes, priorities, and `startTransition`
- `useDeferredValue` vs `useTransition` — when to use which
- Tearing, `useSyncExternalStore`, and external state libraries
- Reading React DevTools' "Why did this render?" output

## Example

```tsx
import { startTransition, useState } from 'react';

export function Search({ items }: { items: string[] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(items);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    startTransition(() => {
      setResults(items.filter(i => i.includes(e.target.value)));
    });
  }

  return <input value={query} onChange={onChange} />;
}
```