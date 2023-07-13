import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResearchPaperDetail } from '@app/shared/models/research-item.model';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const RESEARCH_API_PATH = `${environment.apiEndpointTemplate}/research-paper`
  .replace('{{api-gateway}}', environment.researchPaperApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const RESEARCH_GETALL_CACHE_KEY = 'com.tekcapsule.research.allresearch';

@Injectable({
  providedIn: 'root',
})
export class ResearchApiService {
  constructor(private httpClient: HttpClient) {}

  getAllResearchPaper(): Observable<IResearchPaperDetail[]> {
    return this.httpClient.post<IResearchPaperDetail[]>(
      `${RESEARCH_API_PATH}/getAll`,
      {},
      {
        params: {
          cache: 'yes',
          ckey: RESEARCH_GETALL_CACHE_KEY,
        },
      }
    );
  }
}
