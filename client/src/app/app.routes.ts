import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { VideoChatComponent } from './video-chat/video-chat.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { UserManagementComponent } from './user-management/user-management.component';

export const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'video-chat', component: VideoChatComponent },
  { path: 'group-management', component: GroupManagementComponent },
  { path: 'user-management', component: UserManagementComponent },
];
