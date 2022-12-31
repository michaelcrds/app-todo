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

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  newTaskValue : string = '';
  editTaskValue : string = '';

  constructor(
    private crudService : CrudService,
  ){}

  ngOnInit(): void {
    this.newTaskValue = '';
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask(){
    this.crudService.getAllTasks().subscribe({
      next: (res) => this.taskArr = res,
      error: (err) => alert("Não foi possível carregar tarefas!"),
    })
  }

  addTask(){
    this.newTaskValue = this.newTaskValue.trim();
    if(this.newTaskValue){
      this.taskObj.name = this.newTaskValue;
      this.crudService.addTask(this.taskObj).subscribe({
        next: (res) => this.ngOnInit(),
        error: (err) => alert(err),
        complete: () => this.newTaskValue = ''
      })
    }
  }

  editTask(){
    this.taskObj.name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe({
      next: (res) => this.ngOnInit(),
      error: (err) => alert("Ocorreu um erro ao editar a tarefa!"),
    })
  }

  deleteTask(task:Task){
    this.crudService.deleteTask(task).subscribe({
      next: (res) => this.ngOnInit(),
      error: (err) => alert("Erro ao excluir tarefa!"),
    })
  }

  callModal(task: Task){
    this.taskObj = task;
    this.editTaskValue = this.taskObj.name;
  }

  editCheckbox(task: Task){
    this.taskObj = task
    this.taskObj.checked = !task.checked
    this.crudService.editTask(this.taskObj).subscribe({
      next: (res) => this.taskObj = new Task(),
      error: (err) => alert("Ocorreu um erro ao editar a tarefa!"),
    })

  }
}
