import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from 'src/app/auth/services/token.service';
import { environment } from 'src/environments/environment';
import { BookmarkModel, RequestOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
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

  getAllBookmarks(params: any): Observable<BookmarkModel> {
    return this.handleError(
      this.http
        .get<BookmarkModel>(
          `${environment.apiUrl}/bookmark/bookmarks`,
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

  getBookmark(id: string): Observable<any> {
    return this.handleError(
      this.http
        .get(`${environment.apiUrl}/bookmark/${id}`, this.getRequestOptions())
        .pipe(
          catchError((error) => {
            // Handle error here
            throw error;
          })
        )
    );
  }

  addBookmark(body: object): Observable<any> {
    return this.handleError(
      this.http
        .post(
          `${environment.apiUrl}/bookmark/create`,
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

  updateBookmark(body: object, id: string): Observable<any> {
    return this.handleError(
      this.http
        .patch(
          `${environment.apiUrl}/bookmark/update/${id}`,
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

  deleteBookmark(id: string): Observable<any> {
    return this.handleError(
      this.http
        .delete(
          `${environment.apiUrl}/bookmark/delete/${id}`,
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

  importBookmarks(body: any): Observable<any> {
    return this.handleError(
      this.http
        .post(
          `${environment.apiUrl}/bookmark/import`,
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
}
