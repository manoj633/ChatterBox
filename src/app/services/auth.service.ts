import { inject, Injectable, NgZone } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabase!: SupabaseClient

  private router = inject(Router)
  private _ngZone = inject(NgZone)
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)

    this.supabase.auth.onAuthStateChange((event, session) => {

      localStorage.setItem('session', JSON.stringify(session?.user))

      if (session?.user) {
        this._ngZone.run(() => {
          console.log("runn")
          this.router.navigate(['/chat'])
        })
      }
    })
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem("session") as string
    console.log(user)
    return user === "undefined" ? false : true
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
