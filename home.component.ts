import { filter } from 'rxjs';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
//import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   
  modalRef?: BsModalRef;
  public contas: any = [];
  public contasFiltradas: any = [];
  private _filtroLista: string = '';
  public contaId = 0;
  
  public get filtroLista(): string{
    return this._filtroLista;
  }

  public set filtroLista(value: string ){
    this._filtroLista = value;
    this.contasFiltradas = this.filtroLista ? this.filtrarContas(this.filtroLista) : this.contas;
  }

  filtrarContas(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.contas.filter(
      (conta: any) => conta.cliente.toLocaleLowerCase().indexOf(filtrarPor)!== -1 ||
      conta.agencia.toLocaleLowerCase().indexOf(filtrarPor)!== -1
    )
  }

  constructor(private http: HttpClient, 
              private modalService: BsModalService, 
              private toastr: ToastrService 
              //private spinner: NgxSpinnerService
          ) { }
  
  ngOnInit(): void {
    this.getContas();
  }
 
  public getContas(): void {
    this.http.get('https://localhost:5001/api/Contas').subscribe(
      response => {
        this.contas = response;
        this.contasFiltradas = this.contas;
      },
      error => console.log(error)
    );
  }

  public openModal(event: any, template: TemplateRef<any>, contaId: number): void  {
    event.stopPropagation();
    this.contaId = contaId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
  
    this.modalRef?.hide();
    /*this.spinner.show();

    this.contaService.deleteConta(this.contaId).subscribe(
      (result: any) => {
        if(result.message === 'Deletado'){
          this.toastr.success('A conta foi deletada com Sucesso','Deletado');
          //this.carregarContas();
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o conta ${this.contaId}`, 'Erro');
      }
    ).add(() => this.spinner.hide());*/
  }
  public decline(): void {
    this.modalRef?.hide();
  }
}
