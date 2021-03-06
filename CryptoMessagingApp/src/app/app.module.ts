import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    ChatComponent,
    HomeComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  //the constructor connects to graphql
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
     apollo.create({
      link: httpLink.create({ uri: 'http://localhost:3000/graphql'}),//this url is what sends the data
      cache: new InMemoryCache()
    });
    
  }
}