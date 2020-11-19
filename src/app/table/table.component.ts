import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, User } from '../apidata';

@Component({
  selector: 'table-of-users',
  template: `
    <div class="container-fluid" *ngIf="isAPILoaded; else elseBlock">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr *ngFor="let row of users | slice: 0:1">
            <th
              scope="col"
              *ngFor="let col of row | keyvalue: asIsOrder | slice: 0:-1"
            >
              {{ col.key.replace('_', ' ').toUpperCase() }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            *ngFor="
              let row of users
                | paginate
                  : {
                      id: 'user_pagination',
                      itemsPerPage: pageSize,
                      currentPage: p,
                      totalItems: totalRecords
                    }
            "
          >
            <td *ngFor="let col of row | keyvalue: asIsOrder | slice: 0:-1">
              {{ col.value }}
            </td>
          </tr>
        </tbody>
      </table>

      <pagination-controls
        class="pagination mt-4"
        id="user_pagination"
        (pageChange)="p = $event"
      ></pagination-controls>

      <div class="text-center mt-4 mb-4">
        <a class="btn btn-info btn-lg" routerLink="/">Return</a>
      </div>
    </div>

    <ng-template #elseBlock>
      <p class="display-3 text-center mt-5">LOADING...</p>
    </ng-template>
  `,
  styles: [
    `
      tbody tr {
        background: #f3fffe;
      }

      table tbody tr:hover {
        background: #f3f4ff;
      }

      tbody tr:nth-child(even) {
        background-color: #e7fffd;
      }

      tr > *:first-child {
        text-align: center;
      }

      tbody tr > *:first-child {
        text-align: center;
        font-weight: bolder;
      }

      .pagination /deep/ pagination-template {
        font-size: 20px;
        margin: 0 auto;
      }

      .pagination /deep/ ul *:hover {
        background: #f3f4ff;
      }

      .pagination /deep/ li:not(:last-child) {
        margin-right: 10px;
      }

      .pagination /deep/ .current {
        background: #e7fffd;
        color: black;
      }
    `,
  ],
})
export class TableComponent implements OnInit {
  title = 'Table of users';

  isAPILoaded: boolean = false;

  // API
  API_URL = API_URL;
  users: Array<User> = new Array<User>();

  // pagination params
  pageSize: number = 20;
  p: number = 1;
  totalRecords: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // get json and subscribe to changes
    this.http.get<User[]>(this.API_URL).subscribe((data) => {
      this.users = data;
      this.totalRecords = data.length;
      this.isAPILoaded = true;
    });
  }

  // helpers
  asIsOrder(a: any, b: any) {
    return 0;
  }
}
