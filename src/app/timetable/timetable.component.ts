import { Component, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';

const supabaseUrl = 'https://avwtvnaxcvbpojfbuyft.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2d3R2bmF4Y3ZicG9qZmJ1eWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTMwMzEsImV4cCI6MjA2MTA2OTAzMX0.BygPS6HAAx4CKCpcBwW_Gly2IJeGqzidzIvgUcou-WA'; 
const supabase = createClient(supabaseUrl, supabaseKey);

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    slotMinTime: '07:00:00',
    slotMaxTime: '15:00:00',
    allDaySlot: false,
    height: 'auto',
    headerToolbar: {
      left: '',
      center: 'title',
      right: ''
    },
    events: [],
    eventColor: '#0F172A',
    eventTextColor: '#f1f5f9'
  };

  constructor() {}

  async ngOnInit() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const timetable = await this.getTimetable(user.id);
      this.calendarOptions.events = this.formatTimetableForCalendar(timetable);
    } else {
      console.error('No user connected');
    }
  }

  async getTimetable(studentId: string) {
    const { data, error } = await supabase
      .from('Timetable')
      .select('*')
      .eq('student_id', studentId.trim());

    if (error) {
      console.error('Error fetching timetable:', error);
    }

    return data || [];
  }

  formatTimetableForCalendar(timetable: any[]) {
    const dayMap: any = {
      Monday: '2025-05-26',
      Tuesday: '2025-05-27',
      Wednesday: '2025-05-28',
      Thursday: '2025-05-29',
      Friday: '2025-05-30',
      Saturday: '2025-05-31',
      Sunday: '2025-06-01',
    };

    return timetable.map(item => {
      const start = `${dayMap[item.day]}T${item.start_time}`;
      const end = `${dayMap[item.day]}T${item.end_time}`;
      return {
        title: `${item.subject} (${item.teacher_name})`,
        start,
        end
      };
    });
  }
}

