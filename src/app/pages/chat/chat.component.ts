import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ChatService } from '../../supabase/chat.service';
import { Ichat } from '../../interface/chat-response';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private chat_service = inject(ChatService);
  chatForm!: FormGroup;

  chats = signal<Ichat[]>([])

  constructor() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required]
    });

    effect(() => {
      this.onListChats()
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

  onListChats() {
    this.chat_service.listChat().then((res: Ichat[] | null) => {
      console.log(res);
      if (res !== null) {
        this.chats.set(res)
      } else {
        alert("No messages found");
      }

    }).catch(err => alert(err.message))
  }
}
