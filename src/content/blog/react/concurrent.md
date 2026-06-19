# Concurrent rendering

React 18 didn't add APIs on top of an old scheduler — it rewrote the
scheduler. Renders are now assigned to **lanes** with priorities.

```tsx
import { startTransition, useState } from 'react';

function Search({ items }: { items: string[] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(items);

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        startTransition(() => {
          setResults(items.filter((i) => i.includes(e.target.value)));
        });
      }}
    />
  );
}
```