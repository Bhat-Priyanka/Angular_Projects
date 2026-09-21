import {RedirectCommand, Routes, Router, CanMatchFn} from '@angular/router';
import { TasksComponent } from './app/tasks/tasks.component';
import { NoTaskComponent } from './app/tasks/no-task/no-task.component';
import { NewTaskComponent } from './app/tasks/new-task/new-task.component';
import { resolvedTitle, resolvedUserName, UserTasksComponent } from './app/users/user-tasks/user-tasks.component';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router); 
    const shouldGetAccess = Math.random();
    if (shouldGetAccess < 1) {
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}
export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
        // redirectTo: 'users/u1/',
        // pathMatch: 'full'
        title: 'No Task',
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        canMatch: [dummyCanMatch],
        resolve: {
            userName: resolvedUserName
        },
        title: resolvedTitle
    },
    {
        path:'**',
        component: NoTaskComponent
    }
];


