import { Component, OnInit } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avwtvnaxcvbpojfbuyft.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2d3R2bmF4Y3ZicG9qZmJ1eWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTMwMzEsImV4cCI6MjA2MTA2OTAzMX0.BygPS6HAAx4CKCpcBwW_Gly2IJeGqzidzIvgUcou-WA'; 
const supabase = createClient(supabaseUrl, supabaseKey);

@Component({
  selector: 'app-student-notifications',
  templateUrl: './student-notifications.component.html',
  styleUrls: ['./student-notifications.component.css']
})
export class StudentNotificationsComponent {
  notifications: any[] = [];
  studentId: string | null = null;
  async ngOnInit() {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Erreur d\'authentification', userError);
      return;
    }

    this.studentId = user.id;

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('student_id', this.studentId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur de chargement des notifications :', error);
    } else {
      this.notifications = data;
    }
  }

  async markAsRead(notificationId: number) {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
    this.ngOnInit();
  }
}
