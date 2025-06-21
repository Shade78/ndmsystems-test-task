import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Route } from '../interfaces/route.interface';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { initialRoutes } from '../route-data';

@Component({
  selector: 'app-route-table',
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './route-table.component.html',
  styleUrl: './route-table.component.scss'
})
export class RouteTableComponent implements OnInit, AfterViewInit{
  
  private routes$ = new BehaviorSubject<Route[]>(initialRoutes)
  dataSource = new MatTableDataSource(this.routes$.value)

  displayedColumns: string[] = ['addressMask', 'gateway', 'interface']

  @ViewChild(MatSort) sort!: MatSort

  ngOnInit(): void {
    this.routes$.subscribe(routes => {
      this.dataSource.data = routes
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (route, column) => {
      switch (column) {
        case 'addressMask':
          return this.normalizeIp(`${route.address}/${route.mask}`);
        case 'gateway':
          return this.normalizeIp(route.gateway);
        case 'interface':
          return route.interface;
        default:
          return '';
      }
    };
  }

  private normalizeIp(ipWithMask: string): string {
    const [ip, mask = '0'] = ipWithMask.split('/');
    const octets = ip.split('.').map(octet => octet.padStart(3, '0'));

    while (octets.length < 4) {
      octets.push('000');
    }

    return `${octets.join('.')}/${mask.padStart(2, '0')}`;
  }
  
}
