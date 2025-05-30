import { Component, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avwtvnaxcvbpojfbuyft.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2d3R2bmF4Y3ZicG9qZmJ1eWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTMwMzEsImV4cCI6MjA2MTA2OTAzMX0.BygPS6HAAx4CKCpcBwW_Gly2IJeGqzidzIvgUcou-WA'; 
const supabase = createClient(supabaseUrl, supabaseKey);

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  timetable: any[] = [];

  constructor() {}

  async ngOnInit() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      console.log('Student ID:', user.id);
      this.timetable = await this.getTimetable(user.id);
      console.log('Timetable data:', this.timetable);
    } else {
      console.error('No user connected');
    }
  }
  
  async getTimetable(studentId: string) {
    const { data, error } = await supabase
      .from('Timetable')
      .select('*')
      .eq('student_id', studentId.trim())

    console.log('Requête Supabase data:', data);
    console.log('Requête Supabase error:', error);

    if (error) {
      console.error('Error fetching timetable:', error);
    } else if (!data || data.length === 0) {
      console.warn('Timetable is empty for this student ID.');
    } else {
      console.log('Timetable data:', data);
    }

    return data || [];
  }
}

