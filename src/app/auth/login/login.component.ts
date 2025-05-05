import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import { Router } from '@angular/router';

const supabaseUrl = 'https://avwtvnaxcvbpojfbuyft.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2d3R2bmF4Y3ZicG9qZmJ1eWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTMwMzEsImV4cCI6MjA2MTA2OTAzMX0.BygPS6HAAx4CKCpcBwW_Gly2IJeGqzidzIvgUcou-WA'; 
const supabase = createClient(supabaseUrl, supabaseKey);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.error = 'Formulaire invalide';
      alert(this.error);
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
  
    if (error) {
      this.error = error.message;
      alert('Erreur de connexion : ' + this.error);
      return;
    }
  
    const user = data?.user;
  
    if (!user) {
      alert("Utilisateur non trouvé.");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role', { head: false })
      .eq('id', user.id)
      .single();
  
    if (profileError || !profile) {
      alert("Impossible de récupérer le rôle de l'utilisateur");
      return;
    }
    if (profile.role === 'Teacher') {
      this.router.navigate(['/teacher-dashboard']);
    } else if (profile.role === 'Student') {
      this.router.navigate(['/student-dashboard']);
    } else {
      alert('Rôle inconnu.');
    }
  }
}


