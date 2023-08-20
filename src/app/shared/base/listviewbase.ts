import { ComponentType } from "@angular/cdk/portal";
import { AfterViewInit, ChangeDetectorRef, Directive, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ListBaseComponent } from "../components-base/list-base/list-base.component";
import { ContextMenuItem } from "@syncfusion/ej2-angular-grids";
import { Subject, takeUntil } from "rxjs";

@Directive()
export abstract class ListViewBase implements AfterViewInit, OnInit, OnDestroy {

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
      .pipe(
        takeUntil(this.unsubscriberAdd)
      ).subscribe(() =>
        this.addNew()
      );

    this.listComponent.editSubject
    .pipe(
      takeUntil(this.unsubscriberEdit)
    ).subscribe(() =>
        this.edit()
      );

    this.listComponent.deleteSubject
    .pipe(
      takeUntil(this.unsubscriberDelete)
    ).subscribe(() =>
        this.delete()
      );

    this.listComponent.exportPdfSubject
    .pipe(
      takeUntil(this.unsubscriberExportPDF)
    ).subscribe(() =>
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

  private unsubscriberAdd = new Subject<void>();
  private unsubscriberEdit = new Subject<void>();
  private unsubscriberDelete = new Subject<void>();
  private unsubscriberExportPDF = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscriberAdd.next();
    this.unsubscriberAdd.complete();

    this.unsubscriberEdit.next();
    this.unsubscriberEdit.complete();

    this.unsubscriberDelete.next();
    this.unsubscriberDelete.complete();

    this.unsubscriberExportPDF.next();
    this.unsubscriberExportPDF.complete();
  }

  @ViewChild(ListBaseComponent) listComponent!: ListBaseComponent;

}

