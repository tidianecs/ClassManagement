import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService} from '../supabase.service';
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
      { id: 1, name:  "Student" }
    ];
  }

  async onSubmit() {
    if (this.signupForm.invalid) {
      this.error = "Formulaire invalide";
      alert("Formulaire invalide")
      return;
    }

    const { email, password, firstName, lastName, role } = this.signupForm.value;
  
    // Étape 1 : Créer le compte
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    console.log('Sign up values:', { email, password, firstName, lastName, role });
    
    if (error) {
      this.error = error.message;
      return;
    }
  /*
    const user = data.user;
    const session = data.session;
  
    if (!user || !session) {
      this.error = 'Utilisateur non authentifié (email vérification requise ?)'; 
      return;
    }
  
  const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        role: role,
        email: email,
        password: password
      });
  
    if (insertError) {
      this.error = insertError.message;
      console.error('Erreur insertion profil :', insertError);
      return;
    }*/
    console.log("Bien inscrit");
    alert('Compte créé avec succès !');
    this.signupForm.reset();
  }
}
