import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableConfigurationComponent } from './components/table-configuration/table-configuration.component';
import { CreateComponent } from './components/pages/create/create.component';
import { UpdateComponent } from './components/pages/update/update.component';


const routes: Routes = [
  {path:'',component:TableConfigurationComponent},
  {path:'create',component:CreateComponent},
  {path:'update/:id',component:UpdateComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
