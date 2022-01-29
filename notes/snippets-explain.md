`src/app/private/private-routing.module.ts`

```ts
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '**',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
];
```

giving the routes for lazy loading. ''**'' uses wildcard notation, and is always instatiated regardless of where to navigate to.

routes are called in order, if first not matches, route is matched with next.

---


