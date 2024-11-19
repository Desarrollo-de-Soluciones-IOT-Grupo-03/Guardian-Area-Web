import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '@devices/models/message';

@Component({
  selector: 'app-speak-device',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './speak-device.component.html',
  styleUrl: './speak-device.component.css',
})
export class SpeakDeviceComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;

  messages: Message[] = [
    {
      isGuardiaArea: true,
      isUser: false,
      content: '¡Hola! ¿En qué puedo ayudarte?',
    },
  ];

  helpMessage: Message = {
    isGuardiaArea: true,
    isUser: false,
    content: `Available Commands: <br> /alarm - Activates the audible alarm. <br> Audio indications:<br> Click on the microphone icon to start recording and click again to stop.`,
  };

  currentMessage: string = '';
  isRecording: boolean = false;
  recorder!: MediaRecorder;
  audio: Blob[] = [];

  ngOnInit(): void {}

  sendMessage(): void {
    if (this.currentMessage.trim() != '') {
      this.messages.push({
        isGuardiaArea: false,
        isUser: true,
        content: this.currentMessage.trim(),
      });
      if (this.currentMessage.trim() == '/help') {
        this.messages.push(this.helpMessage);
      }
      this.currentMessage = '';
      this._scrollToBottom();
    }
  }

  toggleRecording() {
    if (!this.isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.isRecording = true;
          this.recorder = new MediaRecorder(stream);
          this.audio = [];
          this.recorder.ondataavailable = (event) => {
            this.audio.push(event.data);
          };

          this.recorder.start();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.isRecording = false;
      this.recorder.stop();

      this.recorder.onstop = () => {
        const audioBlob = new Blob(this.audio, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        this.messages.push({
          isGuardiaArea: false,
          isUser: true,
          content: `<audio controls src="${audioUrl}"></audio>`,
        });

        this._convertBlobToBase64(audioBlob).then((base64) => {
          console.log(base64);
        });
        this._scrollToBottom();
      };
      this.messages = [...this.messages];
    }
  }

  private _scrollToBottom(): void {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  private _convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
