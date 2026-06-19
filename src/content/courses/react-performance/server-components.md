# Server Components deep-dive

RSC isn't "SSR 2.0" — it's a different programming model. We cover what
RSC actually is, what it gives you, and what it takes away.

## What we cover

- The mental model: server vs client component boundaries
- The `"use client"` directive and where it actually matters
- Streaming RSC payloads and Suspense at the boundary
- Data fetching: `async` components, request deduplication, caching layers
- Migration: how to introduce RSC into an existing CSR app without a rewrite

## Example

```tsx
// app/posts/page.tsx — server component
import { db } from '@/lib/db';
import { PostList } from './post-list'; // "use client"

export default async function PostsPage() {
  const posts = await db.post.findMany();
  return <PostList initialPosts={posts} />;
}
```