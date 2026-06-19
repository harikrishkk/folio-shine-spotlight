# Signals from scratch

A signal is a reactive value with a known set of consumers. When the value
changes, every consumer is scheduled — not run synchronously.

```ts
import { signal, computed, effect } from '@angular/core';

const count = signal(0);
const double = computed(() => count() * 2);

effect(() => console.log('double is', double()));

count.set(2); // logs: "double is 4"
```

## The trap

Reading a signal inside a `computed` registers a dependency. Reading the
same signal inside a plain function does not. That asymmetry is the source
of 90% of "why didn't it update?" bugs.