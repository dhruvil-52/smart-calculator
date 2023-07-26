import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VoiceRecognitionService } from 'src/app/voice-recognition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchForm: any;
  clicked: boolean = false;

  constructor(
    private voiceRecognition: VoiceRecognitionService,
  ) {
  }

  ngOnInit(): void {
    this.initVoiceInput();
  }

  /**
   * @description Function to stop recording.
   */
  stopRecording() {
    this.voiceRecognition.stop();
  }

  /**
   * @description Function for initializing voice input so user can chat with machine.
   */
  initVoiceInput() {
    // Subscription for initializing and this will call when user stopped speaking.
    this.voiceRecognition.init().subscribe(() => {
      // User has stopped recording
      // Do whatever when mic finished listening
    });

    // Subscription to detect user input from voice to text.
    this.voiceRecognition.speechInput().subscribe((input) => {
      // Set voice text output to
      // Set voice text output to
      this.searchForm = input;
    });
  }

  /**
   * @description Function to enable voice input.
   */
  startAndStopRecording() {
    if (this.clicked) {
      this.voiceRecognition.start();
      this.searchForm = ""
    } else {
      this.voiceRecognition.stop();
    }
  }
}
