import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LancamentoContaService } from 'src/app/services/lancamento-conta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';

interface PeriodicElement {
  pagamento: string;
  bandeira: string;
  status: string;
  canal: string;
  id: string;
}

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css'],
})
export class LancamentosComponent implements AfterViewInit {

  dataSource: MatTableDataSource<PeriodicElement>;
  ELEMENT_DATA: PeriodicElement[];
  displayedColumns: string[] = [
    'id',
    'bandeira',
    'pagamento',
    'canal',
    'status',
  ];

  data: any;
  values: any;
  clickedRows: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private lancamentoContaService: LancamentoContaService,
    private modalService: NgbModal
  ) {
    this.lancamentoContaService.read().subscribe(
      (param) => {
        this.ELEMENT_DATA = this.orderList(param.data.items);
        this.data = param.data;
        this.dataSource = new MatTableDataSource<PeriodicElement>(
          this.ELEMENT_DATA
        );
        this.clickedRows = new Set<PeriodicElement>();
        this.values = {
          totalAmount: this.data.summary.totalAmount.toFixed(2),
          totalNetAmount: this.data.summary.totalNetAmount.toFixed(2),
          totalAverageAmount: this.data.summary.totalAverageAmount.toFixed(2),
          totalQuantity: this.data.summary.totalQuantity,
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  orderList(param: any) {
    let list = [];
    let element = {
      pagamento: '',
      bandeira: '',
      status: '',
      canal: '',
      id: '',
    };

    for (let atrib of param) {
      element.pagamento = atrib.paymentType;
      element.bandeira = atrib.cardBrand;
      element.status = atrib.status;
      element.canal = atrib.channel;
      element.id = atrib.id;
      list.push(Object.assign({}, element));
    }

    return list;
  }

  converData(param: any) {
    let data = new Date(param);
    let strData = ` ${('0' + data.getDate()).slice(-2)} - ${(
      '0' +
      (data.getMonth() + 1)
    ).slice(-2)} - ${data.getFullYear()}`;
    return strData;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listInModal(param: any) {
    for (let item of this.data.items) {
      if (item.id == param.id) {
        this.lancamentoContaService.modal(item);
        this.modalService.open(ModalComponent, {
          size: 'md',
        });
      }
    }
  }
}
