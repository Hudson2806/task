import { Component, Input } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, push, ref } from 'firebase/database';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() taskList: any;
  newTask: string | undefined;
  user: any;

  constructor() {
    this.getUser()
  }

  getUser() {
    onAuthStateChanged(getAuth(), res => {
      if (res) {
        this.user = res;
      }
    })
  }

  addTodo() {
    push(ref(getDatabase(), "tasks/" + this.user.uid), {
      task: this.newTask,
      createdAt: Date.now()
    }).then(d => {
      this.taskList.push({
        id: d.key,
        task: this.newTask,
        createdAt: Date.now()
      })


      this.newTask = '';
    });



  }
}
