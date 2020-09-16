import { Injectable } from '@angular/core';
import { Config } from 'src/app/Config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private config: Config, private http: HttpClient) {}
  hostUrl = this.config.hostUrl;

  addRecruitment(userId, model) {
    const url = this.hostUrl + `/employment/addEmployement/${userId}`;
    const formData: FormData = new FormData();
    formData.append('name', model.name);
    formData.append('email', model.email);
    formData.append('dateOfBirth', model.birth_date);
    formData.append('educationalQualification', model.educationalQualification);
    formData.append('qualification', model.qualification);
    formData.append('yearsOfExperience', model.experienceYears);
    formData.append('cv', model.CV);
    formData.append('certificate', model.Certificate);
    for (let i = 0; i < model.courses.length; i++) {
      formData.append(`courses[${i}]`, model.courses[i]);
    }
    return this.http.post<any>(url, formData);
  }

  editRecruitment(
    id,
    name,
    email,
    dateOfBirth,
    educationalQualification,
    qualification,
    yearsOfExperience,
    courses,
    cv,
    certificate) {
    const url = this.hostUrl + `/employment/editEmployement/${id}`;
    const urlCertificate = this.hostUrl + `/employment/editCertificateEmployement/${id}`;
    const urlCv = this.hostUrl + `/employment/editCvEmployement/${id}`;
    const otherUrl = this.hostUrl + `/employment/otherEditEmployement/${id}`;
   if(!certificate.lastModified && !cv.lastModified) {
    let model = {
      name,
      dateOfBirth,
      educationalQualification,
      qualification,
      yearsOfExperience,
      courses,
      email
     }
    return this.http.put<any>(otherUrl, model);
   } else if(!cv.lastModified) {
    const formData: FormData = new FormData();
    formData.append('certificate', certificate);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('educationalQualification', educationalQualification);
    formData.append('qualification', qualification);
    formData.append('yearsOfExperience', yearsOfExperience);
    formData.append('courses', JSON.stringify(courses));
    return this.http.put<any>(urlCertificate, formData);
   } else if(!certificate.lastModified) {
    const formData: FormData = new FormData();
    formData.append('cv', cv);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('educationalQualification', educationalQualification);
    formData.append('qualification', qualification);
    formData.append('yearsOfExperience', yearsOfExperience);
    formData.append('courses', JSON.stringify(courses));
    return this.http.put<any>(urlCv, formData);
   }else{
    const formData: FormData = new FormData();
    formData.append('cv', cv);
    formData.append('certificate', certificate);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('educationalQualification', educationalQualification);
    formData.append('qualification', qualification);
    formData.append('yearsOfExperience', yearsOfExperience);
    formData.append('courses', JSON.stringify(courses));
    return this.http.put<any>(url, formData);
   }
  }

  addNursery(userId, model) {
    const url = this.hostUrl + `/register/addRegister/${userId}`;
    return this.http.post<any>(url, model);
  }

  editNursery(id, model) {
    const url = this.hostUrl + `/register/editRegister/${id}`;
    return this.http.put<any>(url, model);
  }

  addConnect(model) {
    const url = this.hostUrl + '/connect/addConnect';
    return this.http.post<any>(url, model);
  }
}
