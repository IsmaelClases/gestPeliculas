import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritasComunicationService {
  private favoritasSubject = new BehaviorSubject<boolean>(false);

  getFavoritasStatus(): Observable<boolean> {
    return this.favoritasSubject.asObservable();
  }

  updateFavoritasStatus(): void {
    this.favoritasSubject.next(true);
  }
}
