import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { LoginAppComponent } from './loginapp/index';
import { RegisterComponent } from './register/index';
import { CommodityComponent } from './commodity/index';
import { CreateCommodityComponent } from './createCommodity';
import { ViewCommodityComponent } from './viewCommodity';
import { EditCommodityComponent } from './editCommodity';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'loginapp', component: LoginAppComponent },
    { path: 'commodity', component: CommodityComponent },
    { path: 'createCommodity', component: CreateCommodityComponent },
    { path: 'viewCommodity', component: ViewCommodityComponent },
    { path: 'editCommodity', component: EditCommodityComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);