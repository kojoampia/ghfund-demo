import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ICircle } from '../circle.model';

@Component({
  selector: 'jhi-circle-detail',
  templateUrl: './circle-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class CircleDetailComponent {
  circle = input<ICircle | null>(null);

  previousState(): void {
    window.history.back();
  }
}
