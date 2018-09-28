import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AskAirpsComponent } from './ask-airps/ask-airps.component';
import { PlayAirpsComponent } from './play-airps/play-airps.component';
import { UpdateAirpsComponent } from './update-airps/update-airps.component';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { StatsComponent } from './stats/stats.component'

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AskAirpsComponent,
    PlayAirpsComponent,
    UpdateAirpsComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
