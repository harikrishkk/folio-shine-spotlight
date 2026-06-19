# Zone-less signal architecture

Signals are the biggest shift in Angular since standalone components.
We rebuild a feature from scratch — no `zone.js`, no manual change
detection — using signals end-to-end.

## What we cover

- The signal primitive: `signal`, `computed`, `effect`
- Interop with RxJS via `toSignal` and `toObservable`
- `provideExperimentalZonelessChangeDetection()` and what it actually changes
- Designing components and services around signal graphs
- Migration playbook for an existing zone-based codebase

## Example

```ts
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  template: `
    <input (input)="query.set($any($event.target).value)" />
    @for (u of filtered(); track u.id) { <p>{{ u.name }}</p> }
  `,
})
export class UsersComponent {
  private users = toSignal(inject(UsersService).all$, { initialValue: [] });
  query = signal('');
  filtered = computed(() =>
    this.users().filter(u => u.name.includes(this.query())),
  );
}
```