import { Component } from '@angular/core';
import { RouteTableComponent } from './route-table/route-table.component';

@Component({
  selector: 'app-root',
  imports: [RouteTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ndmsystems-test-task';
}
