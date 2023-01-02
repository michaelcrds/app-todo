import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskIndex: any = '';
  taskArr: Task[] = [];

  newTaskValue: string = '';
  editTaskValue: string = '';

  constructor(
    private crudService: CrudService,
  ) { }

  ngOnInit(): void {
    this.taskIndex = '';
    this.newTaskValue = '';
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.taskArr = this.crudService.getAllTasks();
  }

  addTask(){
    this.newTaskValue = this.newTaskValue.trim();
    if(this.newTaskValue){
      this.taskObj.name = this.newTaskValue;
      this.crudService.addTask(this.taskObj);
      this.ngOnInit()
    }
  }

  editTask(){
    if(!this.editTaskValue){
      alert('Você não pode salvar uma tarefa em branco!')
    }else{
      this.taskObj.name = this.editTaskValue;
      this.crudService.editTask(this.taskIndex, this.taskObj);
      this.ngOnInit();
    }
  }

  deleteTask(index: number){
    this.crudService.deleteTask(index);
    this.ngOnInit();
  }

  callModal(index:number, task: Task){
    this.taskIndex = index;
    this.taskObj = task;
    this.editTaskValue = this.taskObj.name;
  }

  editCheckbox(index:number, task: Task){
    this.taskIndex = index;
    this.taskObj = task
    this.taskObj.checked = !task.checked
    this.crudService.editTask(this.taskIndex, this.taskObj)
  }
}
