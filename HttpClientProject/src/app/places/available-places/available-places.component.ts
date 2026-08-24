import { Component, signal, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal<string | undefined>(undefined);
  private httpClient = inject(HttpClient);
  private placesService = inject(PlacesService);

  ngOnInit() {
    this.isFetching.set(true);
    this.placesService.loadAvailablePlaces()
      .subscribe({
        next: (places) => {
          console.log(places);
          this.places.set(places);
        },
        error: (error) => {
          this.error.set(error.message);
        },
        complete: () => {
          this.isFetching.set(false);
        }
      });

      // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSelectPlace(place: Place) {
   const subscription = this.placesService.addPlaceToUserPlaces(place
   ).subscribe({
      next: () => {
        console.log(`Place with ID ${place.id} selected successfully.`);
      }
    });
  }


}
