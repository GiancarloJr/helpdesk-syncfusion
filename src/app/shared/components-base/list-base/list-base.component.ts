
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ContextMenuItem, ContextMenuItemModel, GridComponent, PageSettingsModel, SelectionSettingsModel } from '@syncfusion/ej2-angular-grids';
import { MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Subject } from 'rxjs';

@Component({
  selector: 'list-base',
  templateUrl: './list-base.component.html',
  styleUrls: ['./list-base.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListBaseComponent implements OnInit, AfterViewInit {

  @Input('source') data: any;
  @Input('colums') columns: any;
  @Input('showsearchsection') showSearchSection: boolean = true;
  @Input('titulo') titulo: string = '';

  public selectionOptions?: SelectionSettingsModel;


  contextMenuItemModel: ContextMenuItemModel[] = [
    { text: 'Novo', target: '.e-content', id: 'Novo' },
    { text: 'Editar', target: '.e-content', id: 'Editar' },
    { text: 'Remover', target: '.e-content', id: 'Remover' }
  ]

  contextMenuClick(args: MenuEventArgs): void {
    switch (args.item.id) {
      case 'Novo':
        this.add();
        break;
      case 'Editar':
        this.edit();
        break;
      case 'Remover':
        this.exclude();
        break;
    }
  }

  constructor() {
  }

  public pageSettings?: PageSettingsModel;
  public filterOptions: any = {
    type: 'Menu',
    operators: {
      stringOperator: [
        { value: 'startsWith', text: 'Inicia Com' },
        { value: 'endsWith', text: 'Termina Com' },
        { value: 'contains', text: 'Contém' }
      ],
    }
  };


  ngOnInit(): void {
    this.selectionOptions = { type: 'Single', persistSelection: true };
    this.pageSettings = { pageSizes: true, pageSize: 10 };

  }

  ngAfterViewInit(): void {
    this.grid!.dataSource = this.data;
  }

  add(): void {
    this.addSubject.next();
  }

  edit(): void {
    this.editSubject.next();
  }

  exclude(): void {
    this.deleteSubject.next();
  }

  exportPDF(): void {
    this.exportPdfSubject.next();
  }

  public searchElements(searchText: any): void {
    (this.grid as any).search(searchText);
  }

  addSubject = new Subject<void>();
  editSubject = new Subject<void>();
  deleteSubject = new Subject<void>();
  exportPdfSubject = new Subject<void>();

  @ViewChild('Grid') public grid!: GridComponent;

}
