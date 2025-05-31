import { Component } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avwtvnaxcvbpojfbuyft.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2d3R2bmF4Y3ZicG9qZmJ1eWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTMwMzEsImV4cCI6MjA2MTA2OTAzMX0.BygPS6HAAx4CKCpcBwW_Gly2IJeGqzidzIvgUcou-WA'; 
const supabase = createClient(supabaseUrl, supabaseKey);

@Component({
  selector: 'app-student-setting',
  templateUrl: './student-setting.component.html',
  styleUrls: ['./student-setting.component.css']
})
export class StudentSettingComponent {
  newPassword = '';

  async updatePassword() {
    const { error } = await supabase.auth.updateUser({ password: this.newPassword });
    if (error) {
      alert('Erreur : ' + error.message);
    } else {
      alert('Mot de passe mis à jour');
    }
  }
}
