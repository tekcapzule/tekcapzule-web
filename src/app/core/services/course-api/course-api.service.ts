import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourseDetail } from '@app/shared/models/course-item.model';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const COURSE_API_PATH = `${environment.apiEndpointTemplate}/course`
  .replace('{{api-gateway}}', environment.courseApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const COURSE_GETALL_COURSE_CACHE_KEY = 'com.tekcapsule.course.allcourses';
@Injectable({
  providedIn: 'root',
})
export class CourseApiService {
  constructor(private httpClient: HttpClient) {}

  getCourseApiPath(): string {
    return COURSE_API_PATH;
  }

  getAllCourse(): Observable<ICourseDetail[]> {
    return this.httpClient.post<ICourseDetail[]>(
      `${COURSE_API_PATH}/getAll`,
      {},
      {
        params: {
          cache: 'yes',
          ckey: COURSE_GETALL_COURSE_CACHE_KEY,
        },
      }
    );
  }
}
