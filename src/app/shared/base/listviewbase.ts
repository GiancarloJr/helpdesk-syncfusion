import { ComponentType } from "@angular/cdk/portal";
import { AfterViewInit, ChangeDetectorRef, Directive, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ListBaseComponent } from "../components-base/list-base/list-base.component";
import { ContextMenuItem } from "@syncfusion/ej2-angular-grids";

@Directive()
export abstract class ListViewBase implements AfterViewInit, OnInit {

  constructor(protected dialog: MatDialog,
    protected service: any,
    protected _cdr: ChangeDetectorRef,
    protected dialogComponente: ComponentType<any>) {
  }

  public dataSource!: any;

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(): void {
    this.service.findAll().subscribe((resposta: any) => {
      console.log(resposta);

      this.dataSource = resposta;
    });
  }

  ngAfterViewInit(): void {

    this.listComponent.addSubject
      .subscribe(() =>
        this.addNew()
      );

    this.listComponent.editSubject
      .subscribe(() =>
        this.edit()
      );

    this.listComponent.deleteSubject
      .subscribe(() =>
        this.delete()
      );

    this.listComponent.exportPdfSubject
      .subscribe(() =>
        this.exportPdf()
      );
  }

  private addNew(): void {
    this.openDialog('add', this.dialogComponente);
  }

  private edit(): void {

    this.openDialog('edit', this.dialogComponente);
  }

  private delete(): void {

    this.openDialog('delete', this.dialogComponente);
  }

  private exportPdf(): void {
    this.listComponent.grid?.pdfExport();
  }

  private openDialog(tipo: string, dialogComp: ComponentType<any>) {

    if (this.listComponent.grid.getSelectedRecords().length == 0 && tipo !== 'add') {
      // toast seleciona registro
    } else {
      const dialogRef = this.dialog.open(dialogComp, {
        data: {
          object: tipo === 'add' ? null : this.listComponent.grid.getSelectedRecords()[0],
          tipo: tipo
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.initializeData();
      });
    }
  }

  @ViewChild(ListBaseComponent) listComponent!: ListBaseComponent;

}

