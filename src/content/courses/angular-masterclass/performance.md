# Performance profiling & hydration strategy

The difference between a fast Angular app and a slow one is rarely the
framework — it's the architecture. We profile a real app and remove the
top three bottlenecks live.

## What we cover

- Reading Chrome DevTools performance traces (long tasks, layout thrash)
- The Angular DevTools profiler: change detection cost per component
- SSR + **partial hydration** with `@defer` blocks and route-level hydration
- Image, font, and bundle budgets that hold the line
- Real-user monitoring: Core Web Vitals you can act on

## Example: deferring a heavy block

```html
@defer (on viewport) {
  <heavy-chart [data]="data()" />
} @placeholder {
  <skeleton-chart />
}
```

Outcome: hydration cost drops, TTI improves, and you have a measurable
budget per route.