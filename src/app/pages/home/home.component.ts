import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../Services/auth.service';
// Smooth scrolling for navbar links
document.addEventListener('DOMContentLoaded', function(): void {
  // Get all navbar links that should scroll to sections
  const navLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.nav-links a[href^="#"]');

  // Add click event listener to each link
  navLinks.forEach((link: HTMLAnchorElement): void => {
    link.addEventListener('click', function(e: MouseEvent): void {
      // Prevent default anchor behavior
      e.preventDefault();

      // Get the target section id from the href attribute
      const targetId: string | null = this.getAttribute('href');

      if (!targetId) return;

      // Get the target element
      const targetSection: HTMLElement | null = document.querySelector(targetId);

      // If target exists, scroll to it
      if (targetSection) {
        // Get the header height to offset the scroll position
        const header: HTMLElement | null = document.querySelector('header');
        const headerHeight: number = header ? header.offsetHeight : 0;

        // Calculate the target position with offset
        const targetPosition: number = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        // Scroll smoothly to the target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update active class on navbar links
        const allNavLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.nav-links a[href^="#"]');
        allNavLinks.forEach((navLink: HTMLAnchorElement): void => navLink.classList.remove('active'));
        this.classList.add('active');

        // Close mobile menu if open
        const mobileMenu: HTMLElement | null = document.querySelector('.nav-links');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
        }
      }
    });
  });

  // Highlight the active section on scroll
  window.addEventListener('scroll', function(): void {
    let current: string = '';
    const sections: NodeListOf<HTMLElement> = document.querySelectorAll('section[id]');
    const header: HTMLElement | null = document.querySelector('header');
    const headerHeight: number = header ? header.offsetHeight : 0;

    sections.forEach((section: HTMLElement): void => {
      const sectionTop: number = section.offsetTop - headerHeight - 100; // Add some offset
      const sectionHeight: number = section.offsetHeight;

      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = '#' + section.getAttribute('id');
      }
    });

    const navLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach((link: HTMLAnchorElement): void => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  });
});
@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
