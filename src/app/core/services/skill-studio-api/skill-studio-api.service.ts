import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILearningMaterial } from '@app/shared/models/skill-studio-item.model';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const SKILL_STUDIO_API_PATH = `${environment.apiEndpointTemplate}/learning-material`
  .replace('{{api-gateway}}', environment.skillStudioApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const SKILL_STUDIO_GETALL_COURSE_CACHE_KEY = 'com.tekcapzule.skillStudio.allLearning';
@Injectable({
  providedIn: 'root',
})
export class SkillStudioApiService {
  constructor(private httpClient: HttpClient) {}

  getAllLearning(): Observable<ILearningMaterial[]> {
    return this.httpClient.post<ILearningMaterial[]>(
      `${SKILL_STUDIO_API_PATH}/getAll`,
      {},
      {
        params: {
          cache: 'yes',
          ckey: SKILL_STUDIO_GETALL_COURSE_CACHE_KEY,
        },
      }
    );
  }

}
