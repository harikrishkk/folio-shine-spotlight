# Custom directives

Directives are enhancements for elements. Unlike components, they don't
have a template — they attach behavior to an existing host.

```ts
import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({ selector: '[appToggleOpen]', standalone: true })
export class ToggleOpenDirective {
  private host = inject(ElementRef<HTMLElement>);

  @HostListener('click')
  onClick() {
    this.host.nativeElement.classList.toggle('is-open');
  }
}
```

Use `Renderer2` instead of `classList` when you care about SSR — the DOM
API is not available on the server.