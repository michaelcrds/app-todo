import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  taskArr : Task[] = [];

  constructor(
    private http:HttpClient,
  ) {

  }

  addTask(task : Task){
    this.taskArr.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.taskArr))
  }

  getAllTasks() : Task[] {
    this.taskArr = JSON.parse(localStorage.getItem('tasks') || '[]');
    return this.taskArr;
  }

  deleteTask(index : number){
    console.log(index)
    this.taskArr.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.taskArr))
  }

  editTask(index: number, task : Task){
    this.taskArr[index] = task;
    localStorage.setItem('tasks', JSON.stringify(this.taskArr))
  }

}
