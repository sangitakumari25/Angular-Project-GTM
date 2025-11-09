import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TheamService {

  private headingColorSubject = new BehaviorSubject<string>(
    localStorage.getItem('headingColor') || '#000000'
  );
  private cardHeadingColorSubject = new BehaviorSubject<string>(
    localStorage.getItem('cardHeadingColor') || '#0056b3'
  );
  private backgroundColorSubject = new BehaviorSubject<string>(
    localStorage.getItem('backgroundColor') || '#ffffff'
  );

  headingColor$ = this.headingColorSubject.asObservable();
  cardHeadingColor$ = this.cardHeadingColorSubject.asObservable();
  backgroundColor$ = this.backgroundColorSubject.asObservable();

  setHeadingColor(color: string) {
    localStorage.setItem('headingColor', color);
    this.headingColorSubject.next(color);
  }

  setCardHeadingColor(color: string) {
    localStorage.setItem('cardHeadingColor', color);
    this.cardHeadingColorSubject.next(color);
  }

  setBackgroundColor(color: string) {
    localStorage.setItem('backgroundColor', color);
    this.backgroundColorSubject.next(color);
  }
}

