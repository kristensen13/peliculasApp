import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Swiper } from 'swiper';

import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input()
  movies: Movie[] = [];

  swiper: Swiper | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      // Optional parameters
      loop: true,
    });
  }

  ngOnInit(): void {
    // console.log(this.movies);
  }

  onSlideNext() {
    this.swiper?.slideNext();
  }
  onSlidePrev() {
    this.swiper?.slidePrev();
  }
}
