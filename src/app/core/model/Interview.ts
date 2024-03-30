export class Interview{
  interviewDate: string;
  interviewHour: number;
  candidateName: string;
  subject: string;
  interviewerName: string;
  candidateEmail: string;
  lienGoogleMeet: string;

  constructor(interviewDate: string, interviewHour: number, candidateName: string, subject: string, interviewerName: string, candidateEmail: string, lienGoogleMeet: string) {
    this.interviewDate = interviewDate;
    this.interviewHour = interviewHour;
    this.candidateName = candidateName;
    this.subject = subject;
    this.interviewerName = interviewerName;
    this.candidateEmail = candidateEmail;
    this.lienGoogleMeet = lienGoogleMeet
  }
}
