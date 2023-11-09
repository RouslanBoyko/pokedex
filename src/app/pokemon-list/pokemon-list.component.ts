import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {

  pokemons : any[] = [];
  
  constructor(
    private dataService: DataService
  ){ }

  ngOnInit(): void {
    this.dataService.getPokemons()
      .subscribe((response: any) => {
        (response.results as Array<{ name: string }>).forEach(result => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              console.log(this.pokemons);
            });
        });
      });
    }

    OnNextData(){
      this.dataService.getPokemons()
      .subscribe((response: any) => {
        (response.results as Array<{ name: string }>).forEach(result => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              console.log(this.pokemons);
            });
        });
      });
    }
  }
