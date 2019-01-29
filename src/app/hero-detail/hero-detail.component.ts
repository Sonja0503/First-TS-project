import { Jewko, Jewelry } from './../jew';
import { HeroDetailService } from './../hero-detail.service';
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';



@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  jewelry_list: Jewelry[];
  selectedItem: Jewelry = new Jewelry();
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private heroDetailService: HeroDetailService,
    private location: Location
    ) { }

  ngOnInit() {
    this.getHero();
    this.getJewelryList();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).
      subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack);
  }
  delete(hero: Hero): void {
    this.heroService.deleteHero(this.hero).subscribe();
  }
  getJewelryList(): void {
    this.heroDetailService.getJewelry('PUF').subscribe(jw => this.jewelry_list = jw);
  }

  clickJewelry(jewelry: Jewelry) {
    console.log(jewelry);
    this.selectedItem.artist_name = jewelry.artist_name;
    this.selectedItem.jew_name = jewelry.jew_name;
    this.selectedItem.description = jewelry.description;
    this.selectedItem.price = jewelry.price;
    this.selectedItem.id = jewelry.id;
  }
  saveJ(): void {
    this.heroDetailService.updateJewelry(this.selectedItem).subscribe((response) => {
      this.getJewelryList();
      console.log(response);
    });
  }

  deleteJ(jewelry: Jewelry): void {
    this.heroDetailService.deleteJewelry(this.selectedItem).subscribe(() => this.getJewelryList());
  }
}
