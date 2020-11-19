import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { CardsComponent } from './cards/cards.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'table-of-users', component: TableComponent },
  { path: 'cards-with-users', component: CardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
