import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { UserProfile } from '../../../../core/model/UserProfile';
import { departments } from '../../../../core/canstants/canstants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../users-feature/services/user.service';
import { UserItem } from 'src/app/core/model/UserItem';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username!: string;
  helper = new JwtHelperService();
  profileForm!: UntypedFormGroup;
  user!: any;
  fullName!: string;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private profileService: ProfileService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.initForm();
  }

  getCurrentUser() {
    const JWT = localStorage.getItem('token')!;
    const decodedJWT = this.helper.decodeToken(JWT);
    const username = decodedJWT.sub;
    this.username = username;
    console.log(decodedJWT);
    if (decodedJWT.roles[0] == 'Candidate') {
      this.userService.getCurrentCandidate(username).subscribe((user: any) => {
        console.log(user);
        this.profileForm.patchValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          username: user.username,
          city: "",
          country: "",
          postalCode: "",
          aboutMe: "",
          department: "",
        });
        localStorage.setItem('candidateId', user.candidateId);
        this.fullName = `${user.firstname} ${user.lastname}`;
        console.log(this.fullName);
      });
    } else {
      this.userService.getCurrentUser(username).subscribe((user: UserItem) => {
        console.log(user);
        this.user = user
        this.profileForm.patchValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          username: user.username,
          city: user.city ?? "",
          country: user.country ?? "",
          postalCode: user.postalCode ?? "",
          aboutMe: "",
          department: user.department ?? "",
          role: user.roleName ?? ""
        });
        this.fullName = `${user.firstname} ${user.lastname}`;
      });
    }
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      username: [{ value: '', disabled: true }, Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      aboutMe: ['', Validators.required],
      department: ['', Validators.required],
      role: [{value: '', disabled: true}, Validators.required],

    });
  }

  loadUserByUsername() {
    const JWT = localStorage.getItem('token')!;
    const decodedJWT = this.helper.decodeToken(JWT);
    const username = decodedJWT.sub;
    this.profileService.loadUserByUsername(username).subscribe((user) => {
      this.user = user;
      this.fullName = `${this.user.firstname} ${this.user.lastname}`;
      console.log(this.fullName);
      this.patchProfileForm(user);
    });
  }

  patchProfileForm(user: any) {
    this.profileForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      password: user.password,
      address: user.address,
      city: user.city,
      country: user.country,
      postalCode: user.postalCode,
      aboutMe: user.aboutMe,
      department: user.department,
    });
  }

  updateProfile() {
    let profileFormData = new FormData();
    const userProfile = new UserProfile(
      this.profileForm.value.firstname,
      this.profileForm.value.lastname,
      this.user.email,
      this.user.username,
      this.profileForm.value.address,
      this.profileForm.value.city,
      this.profileForm.value.country,
      this.profileForm.value.postalCode,
      this.profileForm.value.aboutMe
    );
    profileFormData.append('profile', JSON.stringify(userProfile));
    switch (this.profileForm.value.department) {
      case 'Department RH':
        profileFormData.append('department', JSON.stringify(departments.RH));
        break;
      case 'Department Marketing':
        profileFormData.append(
          'department',
          JSON.stringify(departments.MARKETING)
        );
        break;
      case 'Department Technique':
        profileFormData.append(
          'department',
          JSON.stringify(departments.TECHNIQUE)
        );
        break;
    }
    this.profileService
      .updateUserProfile(this.user.userId, profileFormData)
      .subscribe((newUser) => {
        console.log('updated successfully');
        console.log(this.user);
        this.user = newUser;
        this.fullName = `${this.user.firstname} ${this.user.lastname}`;
        console.log(newUser);
      });
  }
}
