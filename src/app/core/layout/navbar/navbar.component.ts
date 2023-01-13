import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  public toggle(): void {
    this.navbarCollapse.nativeElement.classList.toggle('responsive');
  }
}
