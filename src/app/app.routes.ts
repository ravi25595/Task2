import { Routes } from '@angular/router';
import { NestedTablesComponent } from './nested-tables/nested-tables.component';
import { NewNestedTablesComponent } from './new-nested-tables/new-nested-tables.component';

export const routes: Routes = [
    {path:"", title:"New Nested Tables", component:NewNestedTablesComponent},
    {path:"old", title:"Nested Tables", component:NestedTablesComponent}
];
