import { Routes } from '@angular/router';
import {CommomPageComponent} from './shared/components/commom-page/commom-page.component';
import {BookComponent} from './pages/book/book.component';

export const routes: Routes = [
  {
    path: '',
    component: CommomPageComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'book',
        component: BookComponent,
        children: [
          {
            path: 'create',
            loadComponent: () => import('./pages/book/create/create.component').then(m => m.CreateComponent),
          },
          {
            path: 'edit/:id',
            loadComponent: () => import('./pages/book/update/update.component').then(m => m.UpdateComponent),
          },
          {
            path: ':id',
            loadComponent: () => import('./pages/book/show/show.component').then(m => m.ShowComponent),
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
];
