// =====================================================================
// Courses configuration. Each course has a list of topics. Each topic
// has a markdown body rendered with syntax highlighting on the right,
// while the topic list shows on the left as a sidebar.
// =====================================================================

export type CourseTopic = {
  slug: string;
  title: string;
  content: string; // markdown
};

export type Course = {
  id: string;
  title: string;
  tagline: string;
  level: string;
  topics: CourseTopic[];
};

export const COURSES: Course[] = [
  {
    id: "angular-essentials",
    title: "Angular Essentials",
    tagline: "From bootstrap to dependency injection — the modern Angular core.",
    level: "Beginner → Intermediate",
    topics: [
      {
        slug: "intro",
        title: "Intro",
        content: `# Welcome to Angular Essentials

This course walks through the modern Angular runtime — standalone components,
signals, control flow, and reactive services — without legacy NgModules.

By the end you will be able to:

- Bootstrap a standalone Angular app
- Compose components with the new control flow
- Wire reactive state with signals and RxJS
- Inject services using the modern \`inject()\` API
`,
      },
      {
        slug: "installation",
        title: "Installation",
        content: `# Installation

Install the Angular CLI globally and scaffold a new workspace:

\`\`\`bash
npm install -g @angular/cli
ng new my-app --standalone --routing --style=css
cd my-app
ng serve
\`\`\`

Open [http://localhost:4200](http://localhost:4200) to see the app.
`,
      },
      {
        slug: "bootstrap-flow",
        title: "Bootstrap flow",
        content: `# Bootstrap flow

Modern Angular skips \`NgModule\` and boots a standalone root component.

\`\`\`ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
\`\`\`
`,
      },
      {
        slug: "dependency-injection",
        title: "Dependency injection",
        content: `# Dependency Injection and services

If we need another option with observable and subscribe, here is another
example with signal & observable.

## Signal + Observable example

\`\`\`ts
// service
getAllUsers(): Observable<User[]> {
  return this.http.get<User[]>('https://reqres.in/api/users').pipe(
    catchError((error) => {
      return of(error);
    }),
    map((res: any) => res.data)
  );
}
\`\`\`

and in component

\`\`\`ts
import { Component, inject, signal } from '@angular/core';
import { User, UsersService } from './users.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-content',
  standalone: true,
  template: \`
    @for (user of users(); track user.id) {
      <p>{{ user.first_name }}</p>
    }
  \`,
})
export class ContentComponent {
  private usersService = inject(UsersService);
  users = toSignal(this.usersService.getAllUsers(), { initialValue: [] });
}
\`\`\`
`,
      },
      {
        slug: "rxjs",
        title: "RxJS",
        content: `# RxJS

Angular leans on RxJS for async streams. The most common operators you'll
reach for are \`map\`, \`switchMap\`, \`catchError\`, and \`combineLatest\`.

\`\`\`ts
import { combineLatest, map } from 'rxjs';

const total$ = combineLatest([price$, qty$]).pipe(
  map(([price, qty]) => price * qty),
);
\`\`\`
`,
      },
    ],
  },
  {
    id: "react-performance",
    title: "React Performance",
    tagline: "Profiling, memoization, Suspense, and Server Components.",
    level: "Advanced",
    topics: [
      {
        slug: "intro",
        title: "Intro",
        content: `# React Performance

A deep dive into making React apps feel instant — from render profiling to
streaming server components.
`,
      },
      {
        slug: "profiling",
        title: "Profiling",
        content: `# Profiling

Use the React DevTools Profiler to record interactions and inspect commits.

\`\`\`tsx
import { Profiler } from 'react';

<Profiler id="Dashboard" onRender={(id, phase, duration) => {
  console.log(id, phase, duration);
}}>
  <Dashboard />
</Profiler>
\`\`\`
`,
      },
      {
        slug: "memoization",
        title: "Memoization",
        content: `# Memoization

\`useMemo\` and \`useCallback\` are not free — they trade GC pressure for
referential stability. Reach for them only when a child is memoized.

\`\`\`tsx
const value = useMemo(() => heavy(input), [input]);
\`\`\`
`,
      },
    ],
  },
];

export const ALL_COURSES = COURSES;
