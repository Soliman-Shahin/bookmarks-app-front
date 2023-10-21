import { HttpHeaders, HttpParams } from '@angular/common/http';

// Define an interface for the bookmark object
export interface Bookmark {
  title: string;
  url: string;
  tags: string[];
  image?: string;
  description: string;
}

export interface BookmarkModel {
  data: {
    _id?: string;
    title: string;
    url: string;
    tags?: string[];
    description: string;
  };
  options: {
    totalCount: number;
  };
}

export interface Tag {
  title: string;
  _id?: string;
}

export interface TagModel {
  data: {
    _id?: string;
    title: string;
  };
  options: {
    totalCount: number;
  };
}

export interface RequestOptions {
  headers: HttpHeaders;
  params: HttpParams;
}
