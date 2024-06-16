import { Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  imports:[NavBarComponent]
})
export class AppComponent {
  title = 'ng-auth';
}
