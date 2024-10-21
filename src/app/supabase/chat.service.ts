import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async chatMessage(text: string) {
    try {
      const { data, error } = await this.supabase.from('chat').insert({ text });

      if (error) {
        alert(error.message);
        return null; // Return null if there's an error during the insert
      }

      return data; // Return the data if successful
    } catch (error) {
      alert(error);
      return null; // Return null if an exception
    }
  }
}
