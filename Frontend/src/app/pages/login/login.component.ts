import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { MatSnackBar }   from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  imports:[FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  email = '';
  password = '';
  remember = false;
  errorMessage = '';


  constructor(
    private authService: AuthService,
    private router: Router,
  private snackBar: MatSnackBar
) {}

  onSubmit() {
    this.errorMessage = '';
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: err => {
        this.snackBar.open(`⚠️ Logout failed: ${err.message || err}`, 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snack-error']
        });
      },
    });
  }

  togglePasswordVisibility(fieldId: string) {
    const input = document.getElementById(fieldId) as HTMLInputElement;
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
