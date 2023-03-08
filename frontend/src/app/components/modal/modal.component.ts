import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LancamentoContaService } from 'src/app/services/lancamento-conta.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  rowTable:any;

  constructor(
    public activeModal: NgbActiveModal,
    private lancamentoContaService: LancamentoContaService
  ) {
    this.rowTable = lancamentoContaService.modal(false)
  };
 
}