import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';

function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const clonedReq = req.clone({
    headers: req.headers.set('X-Custom-Header', 'MyCustomHeaderValue')
  });
  console.log('Request made to: ', clonedReq.url);
  return next(clonedReq).pipe(
    tap({
      next: (event) => {
        if (event.type === 4) { // HttpResponse event
          console.log('Response received from: ', clonedReq.url);
        }
        console.log('Response received from: ', clonedReq.url);
      },
      error: (error) => {
        console.error('Error occurred for request to: ', clonedReq.url, error);
      }
    })
  );
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([/*loggingInterceptor*/])),
  ]
}).catch((err) => console.error(err));
