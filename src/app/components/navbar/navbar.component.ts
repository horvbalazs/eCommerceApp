import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { CartButtonComponent } from '../cart-button/cart-button.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, CartButtonComponent, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  public imagePath = 'logo.png';
}
