import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router'
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})

export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      difficulty: ''
    });
  }

  addTask(title, responsible, description, difficulty) {
    this.taskService.addTask(title, responsible, description, difficulty).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
