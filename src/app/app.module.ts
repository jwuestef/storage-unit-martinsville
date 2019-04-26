import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
// import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SizingAndPricingComponent } from './sizing-and-pricing/sizing-and-pricing.component';
import { LocationComponent } from './location/location.component';
import { SpecialsComponent } from './specials/specials.component';
import { ContactComponent } from './contact/contact.component';

import { TexteditorComponent } from './services/texteditor.component';



const firebaseConfig = {
    apiKey: "AIzaSyB5AFcBWfZgeatCqfU-25VI0hDktkEhWIo",
    authDomain: "storage-unit-martinsville.firebaseapp.com",
    databaseURL: "https://storage-unit-martinsville.firebaseio.com",
    projectId: "storage-unit-martinsville",
    storageBucket: "storage-unit-martinsville.appspot.com",
    messagingSenderId: "1002632632238"
};



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        SizingAndPricingComponent,
        LocationComponent,
        SpecialsComponent,
        ContactComponent,
        TexteditorComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        // FlashMessagesModule
    ],
    providers: [
        AngularFireAuth,
        AngularFireDatabase,
        AngularFireStorage
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
