# Streaming SSR & cache architecture

Streaming SSR turns "blank screen until everything is ready" into
"meaningful pixels in 200ms." We wire it up end-to-end.

## What we cover

- `renderToPipeableStream` vs `renderToReadableStream`
- Suspense boundaries as **stream chunks**
- HTTP caching: `Cache-Control`, `stale-while-revalidate`, edge caches
- Per-route ISR and on-demand revalidation
- Observability: TTFB, FCP, LCP — what to alert on

## Example

```tsx
import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(<App />, {
  bootstrapScripts: ['/main.js'],
  onShellReady() { pipe(res); },
});
```

Outcome: a measurable improvement in real-user LCP on day one.