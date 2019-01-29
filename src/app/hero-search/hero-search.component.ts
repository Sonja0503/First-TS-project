import { HeroService } from './../hero.service';
import { HEROES } from './../mock-heroes';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private serachTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }
  search(term: string): void {
    this.serachTerms.next(term);
  }
  ngOnInit(): void {
    this.heroes$ = this.serachTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
