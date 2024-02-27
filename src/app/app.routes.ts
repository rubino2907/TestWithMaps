import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { LocalizacaoComponent } from './localizacao/localizacao.component';
import { LocalizacaobycityComponent } from './localizacaobycity/localizacaobycity.component';
import { ListasComponent } from './listas/listas.component';

export const routes: Routes = [
    {
        path:"",
        component: HomeComponent,
        title: "Home"
    },
    {
        path: "Localizacao",
        component: LocalizacaoComponent,
        title:"Localizacao",
    },
    {
        path: "LocalizacaoByCity",
        component: LocalizacaobycityComponent,
        title:"Localizacaobycity",
    },
    {
        path: "Listas",
        component: ListasComponent,
        title:"Listas",
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
