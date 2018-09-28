import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AskAirpsComponent } from './ask-airps/ask-airps.component';
import { PlayAirpsComponent } from './play-airps/play-airps.component';
import { UpdateAirpsComponent } from './update-airps/update-airps.component';
import { StatsComponent } from './stats/stats.component';


const routes: Routes = [
  {path: "", pathMatch: "full", component: HomepageComponent},
  {path: "ask", component: AskAirpsComponent},
  {path: 'play', component: PlayAirpsComponent},
  {path: 'update', component: UpdateAirpsComponent},
  {path: 'stats', component: StatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
