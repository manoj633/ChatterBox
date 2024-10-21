import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Ichat } from '../interface/chat-response';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private supabase!: SupabaseClient;
  public savedChats = signal({})

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

  async listChat() {
    try {
      const { data, error } = await this.supabase.from('chat').select('*, users(*)');

      if (error) {
        alert(error.message);
        return null; // Return null if there's an error during the insert
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteChat(id: string) {
    const data = await this.supabase.from('chat').delete().eq('id', id);

    return data;
  }
  selectedChats(msg: Ichat) {
    this.savedChats.set(msg)
  }
}
