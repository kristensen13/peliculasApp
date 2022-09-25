import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movie-response';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  public pelicula!: MovieDetails | null;
  public cast: Cast[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasSvc: PeliculasService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.peliculasSvc.getPeliculaDetalle(id),
      this.peliculasSvc.getCast(id),
    ]).subscribe(([movie, cast]) => {
      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = movie;
      this.cast = cast.filter((actor) => actor.profile_path != null);
    });
    // this.peliculasSvc.getPeliculaDetalle(id).subscribe((movie) => {
    //   //console.log(movie);
    //   if (!movie) {
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.pelicula = movie;
    // });

    // this.peliculasSvc.getCast(id).subscribe((cast) => {
    //   console.log(cast);
    //   this.cast = cast.filter((actor) => actor.profile_path != null);
    // });
  }
  onRegresar() {
    this.location.back();
  }
}
