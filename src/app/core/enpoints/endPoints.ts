export const api_locale = "http://localhost:8080/"
//json-server
export const api_json_server = "http://localhost:3000/"
export const api_analyse = "http://localhost:7777/"

export const endpoints = {

  "saveCandidate": `${api_locale}addNewCandidate`,
  "candidateByUsername": `${api_locale}candidate`,
  "getMyCandidacys": `${api_locale}myCandidacy`,
  "getAllCandidacys": `${api_locale}allCandidacy`,
  "candidates": `${api_locale}candidates`,
  "newFeedback": `${api_locale}newFeedback`,
  "candidateFeedBack": `${api_locale}candidateFeedBack`,
  "updateCandidateStatus": `${api_locale}updateCandidateStatus`,
  "getMyMessageUser": `${api_locale}getMyMessageUser`,
  "getMyMessageCandidate": `${api_locale}getMyMessageCandidate`,
  "loadConversation": `${api_locale}loadConversation`,

  "addNewOffer": `${api_locale}saveOffer`,
  "getAllOffer": `${api_locale}allOffers`,
  "deleteOffer": `${api_locale}deleteOffer`,
  "updateOfferStatus": `${api_locale}updateOfferStatus`,
  "postuler": `${api_locale}postuler`,
  "getJobDetails": `${api_locale}jobDetails`,
  "uploadCv": `${api_locale}uploadCv`,
  "sendNewMessage": `${api_locale}sendNewMessage`,
  "getUserByUsername": `${api_locale}user`,
  "updateUserProfile": `${api_locale}updateProfile`,
  "newUser": `${api_locale}addNewUser`,
  "addRoleToUser": `${api_locale}addRoleToUser`,
  "getAllUsers": `${api_locale}allUsers`,
  "getOnlyRhUsers": `${api_locale}onlyRhUsers`,

  "getDepartmentByDepartmentName":`${api_locale}department`,

  "addNewRequest": `${api_locale}newRequest`,
  "getAllRequests": `${api_locale}allRequests`,
  "updateRequestStatus": `${api_locale}updateRequestStatus`,
  "deleteRequest": `${api_locale}deleteRequest`,

  //json-server
  "getNewCandidates": `${api_json_server}candidate`,

  "getCandidates": `${api_locale}candidates`,
  "addSkillToCandidate": `${api_locale}addSkillToCandidate`,


  "login": `${api_locale}login`,

  "analyse": `${api_analyse}analyseCV`,

  "newEvent": `${api_locale}addNewEvent`,
  "allEvents": `${api_locale}allEvents`,
  "allInterviews": `${api_locale}allInterviews`,
  "updateEvent": `${api_locale}updateEvent`,
  "newInterview": `${api_locale}newInterview`,

  "pushNotificationUser": `${api_locale}pushNotificationUser`,
  "myReqNotifications": `${api_locale}myReqNotifications`,

  
}
