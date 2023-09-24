import { Component, OnInit, Input } from '@angular/core';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { get, getDatabase, ref, remove, set } from 'firebase/database';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Array<any>=[];
  searchText: string = '';
  user: any;


  constructor() {
    this.getUser()
  }


  ngOnInit(): void { }

  getUser() {
    onAuthStateChanged(getAuth(), res => {
      if (res) {
        this.user = res;

        this.getTasks();
      }
    })
  }




  getTasks() {
    get(ref(getDatabase(), 'tasks/' + this.user.uid)).then((data) => {
      console.log('Data', data);

      data.forEach((d) => {
        console.log('d', d);

        this.tasks.push({ ...d.val(), id: d.key });

        console.log('Tasks', this.tasks);

      });
    });
  }

  delete(id: any) {
    remove(ref(getDatabase(), 'tasks/' + this.user.uid + "/" + id));

    let i = this.tasks.findIndex((x: any) => x.id == id);
console.log(i);

    this.tasks.splice(i, 1)
  }
}