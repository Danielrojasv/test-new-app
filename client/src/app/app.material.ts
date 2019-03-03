import { MatToolbarModule, MatIconModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { NgModule } from "@angular/core";

@NgModule({
  imports: [MatToolbarModule, MatIconModule, MatDialogModule, MatButtonModule],
  exports: [MatToolbarModule, MatIconModule, MatDialogModule, MatButtonModule],
})
export class MaterialModule { }