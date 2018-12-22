import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessagesService} from '../core/services/messages.service';
import {Message} from '../core/models/message';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  @ViewChild('alert') alert: ElementRef;
  isShow = false;
  message: Message;

  constructor(private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.messagesService.getMessages()
      .subscribe((msg: Message) => {
        this.message = msg;
        this.isShow = true;
        if (!msg.action) {
          setTimeout(() => this.isShow = false, 4000);
        }
      });
  }

  submit() {
    this.isShow = false;
    this.messagesService.submit();
  }

}
