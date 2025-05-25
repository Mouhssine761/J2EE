import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { MatSnackBar }   from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  imports:[FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  terms = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  private snackBar: MatSnackBar

) {}

  onSubmit() {
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.snackBar.open(`⚠️ Passwords don't match`, 'Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snack-error'],
      });
    }
    if (!this.terms) {
      this.snackBar.open(`⚠️ You must agree to the terms`, 'Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snack-error'],
    });
    }

    this.authService.register(this.email, this.password).subscribe({next: () => {this.router.navigate(['/home']);},
      });
  }

  togglePasswordVisibility(fieldId: string) {
    const input = document.getElementById(fieldId) as HTMLInputElement;
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
