import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VoiceRecognitionService } from 'src/app/voice-recognition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // @ViewChild('inputValue') inputValue: ElementRef;
  // @ViewChild("myNameElem") myNameElem: ElementRef;
  public isUserSpeaking: boolean = false;
  input: any = '';
  result: any = '';
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
    this.isUserSpeaking = false;
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
      let operations: any = {
        "plus": "+",
        "minus": "-",
        "multiply": "*",
        "multiplied": "*",
        "x": "*",
        "divide": "/",
        "divided": "/",
        "reminder": "%",
        "module": "%",
        "modular": "%",
        "modulo": "%"
      }
      for (let property in operations) {
        input = input.replace(property, operations[property]);
      }
      this.input = input;
      this.result = eval(input)
      // console.log("this.myNameElem.nativeElement.value", this.inputValue.nativeElement.value)
      // this.inputValue.nativeElement.value = input;
      // this.myNameElem.nativeElement.value = input;
    });
  }

  /**
   * @description Function to enable voice input.
   */
  startAndStopRecording() {
    if (this.clicked) {
      this.isUserSpeaking = true;
      this.voiceRecognition.start();
      this.input = ""
      // this.inputValue.nativeElement.value = "";
    } else {
      this.voiceRecognition.stop();
      this.isUserSpeaking = false;
    }
  }

  onClick(type: any, value: any) {
    this.voiceRecognition.stop();
    this.input = this.input + '' + value
    switch (value) {
      case 'C':
        this.input = ""
        this.result = eval(this.input)
        break;
      case 'backspace':
        this.input = this.input.replace('backspace', '');
        this.input = this.input.slice(0, -1);
        break;
      case '=':
        this.input = this.input.replace('=', '');
        this.result = eval(this.input)
        break;
      default:
        break;
    }
  }
}
