import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RegisterCandidateService } from '../services/register-candidate.service';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-register-candidate',
  templateUrl: './register-candidate.component.html',
  styleUrls: ['./register-candidate.component.scss'],
})
export class RegisterCandidateComponent implements OnInit {
  candidateForm!: UntypedFormGroup;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  filteredFruits!: Observable<string[]>;
  skills: any[] = [];
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.skills.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: any): void {
    const index = this.skills.indexOf(fruit);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  constructor(
    private fb: UntypedFormBuilder,
    private registerCandidatService: RegisterCandidateService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.candidateForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitCandidate() {
    const candidate: any = {
      ...this.candidateForm.value,
      status_id: 13,
      status: {
        statusId: 13,
        statusName: 'NEW',
        statusColor: '#dccc21',
      },
    };

    const candidateSkillObject= {
      candidateUsername: candidate.username,
      Skills: this.skills
    }
    console.log(candidateSkillObject);


    this.registerCandidatService.register(candidate).pipe(
      mergeMap((data: any)=>{
        console.log(data);
        return this.registerCandidatService.addSkillsToCandidate(candidateSkillObject).pipe(
          map((data2: any)=>{
            console.log(data2);
            this.candidateForm.reset()
          })
        )

      })
    ).subscribe()
  }
}
