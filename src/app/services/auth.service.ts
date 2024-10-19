import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabase!: SupabaseClient
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
    })
  }

  async signInWithGoogle() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google'
    });
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }
}
