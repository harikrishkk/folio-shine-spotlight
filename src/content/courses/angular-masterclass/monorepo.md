# Enterprise schematics & monorepo scaling

Once you cross ~5 squads, ad-hoc folder structures stop working. This
module teaches the architectural patterns that scale Angular to dozens of
teams sharing one repo.

## What we cover

- Nx workspace layout: `apps/`, `libs/`, scope and type tags
- Enforcing module boundaries with `@nx/enforce-module-boundaries`
- Custom **schematics** and **generators** for your team's conventions
- Affected graphs, distributed task execution, and CI partitioning
- Versioning and publishing internal libraries

## Example tags

```json
{
  "scope:checkout": ["libs/checkout/**"],
  "scope:shared":   ["libs/shared/**"],
  "type:feature":   ["**/feature-*/**"],
  "type:ui":        ["**/ui-*/**"]
}
```

You leave with a generator your team can run on day one.