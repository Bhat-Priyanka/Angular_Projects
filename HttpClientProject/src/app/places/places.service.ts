import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Place } from './place.model';
import { tap } from 'rxjs/internal/operators/tap';
import { ErrorService } from '../shared/shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'Failed to fetch available places. Please try again later.')
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'Failed to fetch user places. Please try again later.').pipe(
      tap({
        next: (places) => this.userPlaces.set(places)
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
    if (prevPlaces.some(p => p.id === place.id)) {
      return throwError(() => new Error('Place is already in user places.'));
    }
    this.userPlaces.set([...prevPlaces, place]);

    return this.httpClient.put(`http://localhost:3000/user-places`, { placeId: place.id }).pipe(
      catchError((error) => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to add place to user places. Please try again later.');
        return throwError(() => new Error('Failed to add place to user places. Please try again later.'));
      })
    );
  }

  removeUserPlace(place: Place) {
    
  }

  private fetchPlaces(url:string, errorMessage: string)
  {
    return this.httpClient
    .get<{ places: Place[] }>(url)
        .pipe(
          map(response => response.places),
          catchError((error) => {
            return throwError(() => new Error(errorMessage));
          })
        )
  }
}
