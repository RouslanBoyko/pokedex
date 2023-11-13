import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {

  pokemons : any[] = [];
  offset = 0;
  limit = 10;
  
  constructor(
    private dataService: DataService
  ){ }

  ngOnInit(): void {
    this.dataService.getPokemons(this.offset,this.limit)
      .subscribe((response: any) => {
        (response.results as Array<{ name: string }>).forEach(result => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              this.pokemons.sort((a, b) => a.id - b.id);
              console.log(this.pokemons);
            });
        });
      });
    }

    next(){
      this.offset += 10
      this.pokemons = [];
      this.dataService.OnNextData(this.offset,this.limit)
      .subscribe((response: any) => {
        (response.results as Array<{ name: string }>).forEach(result => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              this.pokemons.sort((a, b) => a.id - b.id);
              console.log(this.pokemons);
              
            });
        });
      });
    }

    previous(){
      this.offset -= 10
      this.pokemons = [];
      this.dataService.OnPreviousData(this.offset,this.limit)
      .subscribe((response: any) => {
        (response.results as Array<{ name: string }>).forEach(result => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              this.pokemons.sort((a, b) => a.id - b.id);
              console.log(this.pokemons);
              
            });
        });
      });
    }
  }
