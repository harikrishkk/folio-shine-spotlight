---
title: React Performance
tagline: Concurrent mode, memory forensics, RSC, and streaming SSR — for teams scaling React in production.
level: Expert
---

# Curriculum Overview

A three-day deep-dive into how React 18+ actually renders, schedules, and streams — and what that means for the apps you ship. ~50% live coding on a real app, cohort capped at 12.

# Concurrent mode internals

React 18 didn't just add new APIs — it rewrote the scheduler. Open the hood and trace a render from `setState` to commit: the fiber tree, lanes and priorities, `startTransition` vs `useDeferredValue`, tearing, and reading the "Why did this render?" output.

# Memory leak forensics in production

Leaks in React rarely come from React itself — they come from subscriptions, closures, and detached DOM. Hunt them with heap snapshots and the 3-snapshot technique, common offender patterns, production monitoring, and a leak-regression test you can run every release.

# Server Components deep-dive

RSC isn't "SSR 2.0" — it's a different programming model. Server vs client boundaries, where `"use client"` actually matters, streaming RSC payloads, async data fetching with request dedup, and a pragmatic migration path that doesn't require a rewrite.

# Streaming SSR & cache architecture

Turn "blank screen until everything is ready" into "meaningful pixels in 200ms." `renderToPipeableStream`, Suspense boundaries as stream chunks, HTTP caching with `stale-while-revalidate`, per-route ISR, and the observability signals worth alerting on.