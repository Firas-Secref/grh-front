import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, FormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {map, mergeMap} from "rxjs/operators";
import {departments, roles} from "../../../../core/canstants/canstants";
import {NewUser} from "../../../../core/model/NewUser";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserItem} from "../../../../core/model/UserItem";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder, private userService: UserService) { }
  helper = new JwtHelperService()

  username: string= "";
  allUsers!: any[]
  newUserModal!: boolean
  newUserForm!: UntypedFormGroup
  roleInfo = [
    { label: "RH", value: roles.RH },
    { label: 'MANAGER', value: roles.MANAGER },
    { label: 'TEAM_LEAD', value: roles.TEAM_LEAD },
  ];
  newRole : any

  departmentOptions = [
    {name: 'RH', value: departments.RH},
    {name: 'MARKETING', value: departments.MARKETING},
    {name: 'TECHNIQUE', value: departments.TECHNIQUE}
  ]
  ngOnInit(): void {
    this.initForm();
    this.getAllUsers()
  }

  showModalDialog() {
    this.newUserModal = true;
  }

  initForm(){
    this.newUserForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['',Validators.required],
      username: ['', Validators.required],
      password: [this.generateRandomPassword(),Validators.required],
      department: [this.departmentOptions[0].value, Validators.required]
    })
  }

  submitForm() {
    console.log(this.newUserForm.value)

    console.log(this.newRole)

    const formData: FormData = new FormData();

    const newUser = new NewUser(
      this.newUserForm.value.firstname,
      this.newUserForm.value.lastname,
      this.newUserForm.value.username,
      this.newUserForm.value.email,
      this.newUserForm.value.password,
      );
    formData.append("user", JSON.stringify(newUser))
    formData.append("department", JSON.stringify(this.newUserForm.value.department.value));
    this.userService.addNewUser(formData).pipe(
      mergeMap((data:any)=>{
        console.log(data)
        return this.userService.addRoleToUser(this.newUserForm.value.username, this.newRole.roleName).pipe(
          map((data2: any)=>{
            console.log("done");
            this.newUserModal = false;
            this.getAllUsers()
          })
        )
      })
    ).subscribe();
  }

  getAllUsers(){
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)
    const username = decodedJWT.sub;

    this.userService.getAllUsers(username).subscribe((users: UserItem[])=>{
      users.map(u=>{
        u.fullName = `${u.firstname} ${u.lastname}`
      })
      console.log(users)
      this.allUsers = users
    })
  }

  generateRandomPassword(){
    let text: string = "";
    let possible = "ABCabcPQRSKNLMOYZTXhijUVdefgH([*Iklpmno#&qrstuvWDJwx0156!:yEF234Gz;?=)à@ç789^_è-|+";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text
  }
}
