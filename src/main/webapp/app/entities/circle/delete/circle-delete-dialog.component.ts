import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICircle } from '../circle.model';
import { CircleService } from '../service/circle.service';

@Component({
  templateUrl: './circle-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CircleDeleteDialogComponent {
  circle?: ICircle;

  protected circleService = inject(CircleService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.circleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
