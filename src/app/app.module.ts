import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, CommodityService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { LoginAppComponent } from './loginapp/index';
import { RegisterComponent } from './register/index';
import { CommodityComponent } from './commodity/index';
import { CreateCommodityComponent } from './createCommodity/index';
import { ViewCommodityComponent } from './viewCommodity/index';
import { EditCommodityComponent } from './editCommodity/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        LoginAppComponent,
        RegisterComponent,
        CommodityComponent,
        CreateCommodityComponent,
        ViewCommodityComponent,
        EditCommodityComponent,
        FileSelectDirective
    ],

    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        CommodityService,
        
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }