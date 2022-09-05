import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './screens/home/home.component';
import { CartComponent } from './screens/cart/cart.component';
import { CurrencyPipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store';
import { AppService } from './app.service';
import { metaReducers } from './store/interceptor';
import { Broadcaster } from './app.broadcast';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    StoreModule.forRoot(appReducer, {
      metaReducers,
    }),
  ],
  providers: [AppService, CurrencyPipe, ToastrService, Broadcaster],
  bootstrap: [AppComponent],
})
export class AppModule {}
