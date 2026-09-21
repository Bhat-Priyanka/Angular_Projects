import { Component, inject, input} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  userName = input.required<string>();
  message = input.required<string>();
}
export const resolvedUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState : RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find(user => user.id === activatedRoute.paramMap.get('userId'))?.name || '';
  return userName;
};

export const resolvedTitle: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState : RouterStateSnapshot) => {
  return resolvedUserName(activatedRoute, routerState) + ' Tasks';
};