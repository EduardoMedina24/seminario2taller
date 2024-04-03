import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nevel',
  templateUrl: './nevel.page.html',
  styleUrls: ['./nevel.page.scss'],
})
export class NevelPage implements OnInit {
  public nivel: number = 0
  jugador: string = '';
  public opciones: any[] =[
    {id: 1, name:'Fácil',color: 'success'},
    {id: 2, name:'Normal',color: 'warning'},
    {id: 3, name:'Difícil',color: 'danger'},

  ]

  constructor(private route: ActivatedRoute,
    public router: Router ) {
    
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.jugador = params['jugador'];
    });
  }

  onSelectNivel(id: number){
    // console.log(id)
    this.router.navigate(['jugar',id], { queryParams: { jugador: this.jugador }});
  }
}
