# Custom RxJS operators & reactive patterns

RxJS is the substrate of every serious Angular app. This module teaches
you to **think in streams** — not callbacks dressed up as observables.

## What we cover

- Higher-order mapping: `switchMap` vs `mergeMap` vs `concatMap` vs `exhaustMap`
- Multicasting with `shareReplay`, `connectable`, and ref-counting pitfalls
- Building **your own operators** with `pipe()` and the `OperatorFunction<T,R>` contract
- State machines on top of `scan`
- Cancellation, retries, and backoff that actually work

## Example: a typed retry-with-backoff operator

```ts
import { Observable, timer, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';

export function retryWithBackoff<T>(maxRetries = 3, base = 500) {
  return (source: Observable<T>) =>
    source.pipe(
      retry({
        count: maxRetries,
        delay: (_err, attempt) => timer(base * 2 ** attempt),
      }),
    );
}
```

By the end of this module you can refactor a tangled `subscribe`-heavy
service into a single declarative pipeline.