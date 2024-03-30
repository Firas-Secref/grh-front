import {OfferCategory} from "../model/Post";
import {Status} from "../model/Status";
import {Department} from "../model/Department";
import {Role} from "../model/Role";

export const categories = {
  JOB_OFFER: new OfferCategory(7,"JOB OFFER"),
  INTERNSHIP_OFFER: new OfferCategory(8,"INTERNSHIP OFFER")
}

export const status = {
  // status for offers
  DRAFT: new Status(18,"DRAFT", "#dccc21"),
  PUBLISHED: new Status(19,"PUBLISHED", "#21dc56"),
  ARCHIVED: new Status(20,"ARCHIVED", "#c7621c"),
  CLOSED: new Status(21,"CLOSED", "#6b7781"),

  //status for candidates
  NEW: new Status(13,"NEW", "#e87d9a"),
  INTERVIEW: new Status(14,"INTERVIEW", "#7db8e8"),
  REFUSED: new Status(15,"REFUSED", "#dc033e"),
  ACCEPTED: new Status(16,"ACCEPTED", "#1cdc00"),
  CONFIRMED: new Status(17,"CONFIRMED", "#e3ec5b"),

  TODO: new Status(9,"TODO", "#dc033e"),
  DOING: new Status(10,"DOING", "#e3ec5b"),
  DONE: new Status(11,"DONE", "#1cdc00")

}



export const postStatusFilterDropDown = [

  {
    statusName: "DRAFT",
    statusColor: "#dccc21"
  },
  {
    statusName: "PUBLISHED",
    statusColor: "#21dc56"
  },
  {
    statusName: "ARCHIVED",
    statusColor: "#c7621c"
  },
  {
    statusName: "CLOSED",
    statusColor: "#6b7781"
  },
]

export const requestStatusFilterDropDown = [

  {
    statusName: "TODO",
    statusColor: "#dc033e"
  },
  {
    statusName: "DOING",
    statusColor: "#e3ec5b"
  },
  {
    statusName: "DONE",
    statusColor: "#1cdc00"
  },

]
export const CandidateStatus = [
  {
    statusName: "NEW",
    statusColor: "#e87d9a"
  },

  {
    statusName: "INTERVIEW",
    statusColor: "#7db8e8"
  },
  {
    statusName: "REFUSED",
    statusColor: "#dc033e"
  },
  {
    statusName: "ACCEPTED",
    statusColor: "#1cdc00"
  },
  {
    statusName: "CONFIRMED",
    statusColor: "#e3ec5b"
  }

]

export const departments = {
  RH: new Department(4, "Department RH"),
  MARKETING: new Department(5, "Department Marketing"),
  TECHNIQUE: new Department(6, "Department Technique")
}

export const days = Array.from({length: 31}, (_, i) => i+1)

export const years = Array.from({length: 255}, (_, i) => i+2000)

export const months = [
  {
    value: 1,
    name: " January"
  },
  {
    value: 2,
    "name": "February"
  },
  {
    value: 3,
    "name": "March"
  },
  {
    value: 4,
    "name": "April"
  },
  {
    value: 5,
    "name": "May"
  },
  {
    value: 6,
    "name": "June"
  },
  {
    value: 7,
    "name": "July"
  },
  {
    value: 8,
    "name": "August"
  },
  {
    value: 9,
    "name": "September"
  },
  {
    value: 10,
    "name": "October"
  },
  {
    value: 11,
    "name": "November"
  },
  {
    value: 12,
    "name": "December"
  }
]

export const testUser = {
  "userId": 18,
  "firstname": "Fiars",
  "lastname": "secref",
  "email": "sh.firas10@gmail.com",
  "username": "firass",
  "address": "bennane",
  "city": "monastir",
  "country": "tunisia",
  "postalCode": 5025,
  "aboutMe": "about me",
  "department": "Department RH"
}

export const roles = {
  RH: new Role(1, 'RH'),
  MANAGER: new Role(2, 'MANAGER'),
  TEAM_LEAD: new Role(3, 'TEAM_LEAD'),
}

export const colorEvents = {

}

