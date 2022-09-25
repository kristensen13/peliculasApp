import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public moviesSlideshow: Movie[] = [];
  public movies: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    if (pos > max) {
      if (this.peliculasSvc.cargando) {
        return;
      }
      this.peliculasSvc.getCartelera().subscribe((movies) => {
        this.movies.push(...movies);
      });
    }
  }

  constructor(private peliculasSvc: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasSvc.getCartelera().subscribe((movies) => {
      //console.log(resp.results);
      this.movies = movies;
      this.moviesSlideshow = movies.slice(0, 10);
    });
  }

  ngOnDestroy(): void {
    this.peliculasSvc.resetCarteleraPage();
  }
}
