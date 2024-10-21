import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ChatService } from '../../supabase/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private chat_service = inject(ChatService);
  chatForm!: FormGroup;

  constructor() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required]
    })
  }

  async logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login'])
    }).catch((err) => {
      alert(err.message);
    })
  }

  onSubmit() {
    const formValue = this.chatForm.value.chat_message;
    console.log(formValue)

    this.chat_service.chatMessage(formValue).then((res) => {
      console.log(res)
      this.chatForm.reset();
    }).catch((err) => {
      alert(err.message);
    })
  }
}
