import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  public texto: string = '';
  public movies: Movie[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasSvc: PeliculasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.texto = params['texto'];
      //llamar servicio
      this.peliculasSvc.buscarPelicula(params['texto']).subscribe((movies) => {
        this.movies = movies;
      });
    });
  }
}
