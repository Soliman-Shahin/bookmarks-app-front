import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { TokenService } from 'src/app/auth/services/token.service';
import { environment } from 'src/environments/environment';
import { RequestOptions, TagModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private handleError<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(
      catchError((error) => {
        // Handle error here
        throw error;
      })
    );
  }

  private getRequestOptions(params?: any): RequestOptions {
    return {
      headers: new HttpHeaders({
        'access-token': this.tokenService.getAccessToken(),
      }),
      params: new HttpParams({ fromObject: params }),
    };
  }

  getAllTags(params: any): Observable<TagModel> {
    return this.handleError(
      this.http
        .get<TagModel>(
          `${environment.apiUrl}/tag/tags`,
          this.getRequestOptions(params)
        )
        .pipe(
          catchError((error: any) => {
            // Handle error here
            throw error;
          })
        )
    );
  }

  getTag(id: string): Observable<any> {
    return this.handleError(
      this.http
        .get(`${environment.apiUrl}/tag/${id}`, this.getRequestOptions())
        .pipe(
          catchError((error) => {
            // Handle error here
            throw error;
          })
        )
    );
  }

  addTag(body: object): Observable<any> {
    return this.handleError(
      this.http
        .post(
          `${environment.apiUrl}/tag/create`,
          body,
          this.getRequestOptions()
        )
        .pipe(
          catchError((error) => {
            // Handle error here
            throw error;
          })
        )
    );
  }

  updateTag(body: object, id: string): Observable<any> {
    return this.handleError(
      this.http
        .patch(
          `${environment.apiUrl}/tag/update/${id}`,
          body,
          this.getRequestOptions()
        )
        .pipe(
          catchError((error) => {
            // Handle error here
            throw error;
          })
        )
    );
  }

  deleteTag(id: string): Observable<any> {
    return this.handleError(
      this.http
        .delete(
          `${environment.apiUrl}/tag/delete/${id}`,
          this.getRequestOptions()
        )
        .pipe(
          catchError((error) => {
            // Handle error here
            throw error;
          })
        )
    );
  }
}
