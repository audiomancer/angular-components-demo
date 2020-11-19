import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <p class="display-3 text-center mt-5">View users by table or cards</p>

    <div class="text-center mt-5">
      <a class="btn btn-info btn-lg mr-4" routerLink="/table-of-users"
        >Table of users</a
      >
      <a class="btn btn-info btn-lg mr-4" routerLink="/cards-with-users"
        >Cards with users</a
      >
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  title = 'Home';

  constructor() {}

  ngOnInit(): void {}
}
