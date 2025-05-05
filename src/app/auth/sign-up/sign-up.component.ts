import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avwtvnaxcvbpojfbuyft.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2d3R2bmF4Y3ZicG9qZmJ1eWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTMwMzEsImV4cCI6MjA2MTA2OTAzMX0.BygPS6HAAx4CKCpcBwW_Gly2IJeGqzidzIvgUcou-WA'; 
const supabase = createClient(supabaseUrl, supabaseKey);

interface Role {
  id: number,
  name: String
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  error: string | null = null;
  roles: Role[];

  ngOnInit(): void {
    this.signupForm.get('role')?.valueChanges.subscribe(value => {
      console.log('Selected role:', value);
    });
  }

  constructor(private fb: FormBuilder){
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
    this.roles = this.getRole();
  }

  getRole(){
    return [
      { id: 0, name: "Teacher" },
      { id: 1, name: "Student" }
    ];
  }

  async onSubmit() {
    if (this.signupForm.invalid || this.signupForm.value.role === 'default') {
      this.error = "Formulaire invalide ou rôle non sélectionné";
      alert(this.error);
      return;
    }
  
    const { email, password, firstName, lastName, role } = this.signupForm.value;
  
    console.log("SIGNUP PAYLOAD:", { email, password, firstName, lastName, role });
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
  
    if (error) {
      this.error = error.message;
      alert("Erreur signup: " + this.error);
      return;
    }
  
    const user = data.user;
    if (!user) {
      this.error = 'Utilisateur non créé';
      return;
    }
  
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        role: role, // doit être une string: "Student" ou "Teacher"
        email: email,
        password: password
      });
  
    if (insertError) {
      this.error = insertError.message;
      console.error('Erreur insertion profil :', insertError);
      return;
    }
  
    console.log("Bien inscrit");
    alert('Compte créé avec succès !');
  }
  
}
