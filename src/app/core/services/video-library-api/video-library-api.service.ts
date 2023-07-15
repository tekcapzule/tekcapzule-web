import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVideoDetail } from '@app/shared/models/video-library-item.model';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const VIDEO_API_PATH = `${environment.apiEndpointTemplate}/video-library`
  .replace('{{api-gateway}}', environment.videoApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const VIDEO_GETALL_CACHE_KEY = 'com.tekcapsule.video.allvideo';

@Injectable({
  providedIn: 'root',
})
export class VideoLibraryApiService {
  constructor(private httpClient: HttpClient) {}

  getInterviewApiPath(): string {
    return VIDEO_API_PATH;
  }

  getAllVideos(): Observable<IVideoDetail[]> {
    return this.httpClient.post<IVideoDetail[]>(
      `${VIDEO_API_PATH}/getAll`,
      {},
      {
        params: {
          cache: 'yes',
          ckey: VIDEO_GETALL_CACHE_KEY,
        },
      }
    );
  }

  getVideo(code: string): Observable<IVideoDetail> {
    return this.httpClient.post<IVideoDetail>(`${VIDEO_API_PATH}/get`, {code}, {
      params: {
        cache: 'no',
      },
    });
  }

}
