import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero, Jewelry, Storage } from '../hero';
import { NgForm, Form, Validators } from '@angular/forms';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  storage_list: any[];
  charr = new Jewelry();
  jewelry = new Storage();
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
    this.getStorage();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) {return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  addJewelry(): void {
    console.log(this.charr);
    this.heroService.addJewelry(this.charr).subscribe(responseSaBackenda => {console.log(responseSaBackenda); this.charr = new Jewelry();
    });
}

  addSto(): void {
    console.log(this.jewelry);
    this.heroService.addStore(this.jewelry).subscribe(resp => {console.log(resp); this.jewelry = new Storage();
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  getStorage(): void {
    this.heroService.getHBezvezeList('ring').subscribe(respo => this.storage_list = respo);
  }
}
