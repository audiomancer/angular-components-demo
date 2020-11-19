import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, User } from '../apidata';

@Component({
  selector: 'app-cards',
  template: `
    <div class="container-fluid" *ngIf="isAPILoaded; else elseBlock">
      <div class="container-fluid">
        <div class="row card-group">
          <div
            class="col-sm-2 mt-4"
            *ngFor="
              let user of users
                | paginate
                  : {
                      id: 'user_pagination',
                      itemsPerPage: pageSize,
                      currentPage: p,
                      totalItems: totalRecords
                    }
            "
          >
            <div class="card">
              <div class="card-header">
                <img class="card-img-top" src="{{ user.avatar_url }}" />
              </div>

              <div class="card-body">
                <h5 class="card-title">
                  {{ user.first_name + ' ' + user.last_name }}
                </h5>
                <p class="card-text"><b>E-mail:</b> {{ user.email }}</p>
                <p class="card-text"><b>Tel.:</b> {{ user.tel }}</p>
                <p class="card-text"><b>Address:</b> {{ user.address }}</p>
                <a class="btn btn-info" href="#">See profile</a>
              </div>
            </div>
          </div>
        </div>
      </div>

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
      div.col-sm-2 {
        flex-grow: 1;
        max-width: 100%;
      }

      div.card-body {
        word-break: break-all;
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
export class CardsComponent implements OnInit {
  title = 'Cards with users';

  isAPILoaded: boolean = false;

  // API
  API_URL = API_URL;
  users: Array<User> = new Array<User>();

  // pagination params
  pageSize: number = 18;
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
