import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { MessageRoutingModule } from './message-routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule, 
    MessageRoutingModule,
    CardModule,
    ButtonModule,
    SharedModule
  ]
})
export class MessagesModule { }
