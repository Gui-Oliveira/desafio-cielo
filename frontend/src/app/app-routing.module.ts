import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LancamentosComponent} from './views/lancamentos/lancamentos.component';
import { IntroComponent } from './views/intro/intro.component';

const routes: Routes = [
  {
    path: "",
    component: IntroComponent
  },
  {
    path: "lancamentos",
    component: LancamentosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
