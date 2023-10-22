import { Component, Inject, OnInit, inject } from '@angular/core';
import { BookmarksService } from '../../services/bookmarks.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Bookmark } from '../../models';
// Import the htmlparser2 library
import { Parser } from 'htmlparser2';
import { BaseComponent } from 'src/app/shared/base';

@Component({
  selector: 'app-import-bookmarks',
  templateUrl: './import-bookmarks.component.html',
  styleUrls: ['./import-bookmarks.component.scss'],
})
export class ImportBookmarksComponent extends BaseComponent implements OnInit {
  file: any;
  uploadProgress: number = 0;

  bookmarksService = inject(BookmarksService);

  constructor(
    public dialogRef: MatDialogRef<ImportBookmarksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit() {}

  onFileChange(event: any) {
    // get the selected file
    let file = event.target.files[0];

    // check the file type
    if (file.type === 'text/html') {
      // handle HTML file
      let reader = new FileReader();
      // define a callback function for the reader
      reader.onload = () => {
        // save the file content to a variable
        let html = reader.result as string;
        // Parse the HTML content
        this.convertHtmlBookmarksToJson(html);
      };
      // read the file as text
      reader.readAsText(file);
    } else if (file.type === 'application/json') {
      // handle JSON file
      // create a file reader
      let reader = new FileReader();
      // define a callback function for the reader
      reader.onload = () => {
        // parse the file content as JSON
        let data = JSON.parse(reader.result as string);
        // save the data to a constant
        this.file = data;
      };
      // read the file as text
      reader.readAsText(file);
    }
  }

  importBookmarks() {
    const data = this.file;
    this.bookmarksService.importBookmarks(data).subscribe(
      (res: any) => {
        this.openSnackBar(
          'success',
          res?.ok,
          this.translateService.instant('BOOKMARK.imported')
        );
        this.dialogRef.close(true);
      },
      (err: any) => {
        console.log('error', err);
        this.openSnackBar('error', err?.ok, err?.error?.message);
      }
    );
  }

  convertHtmlBookmarksToJson(file: any) {
    // Define an array to store the bookmarks
    let bookmarks: Bookmark[] = [];

    // Define a variable to store the current tag name
    let currentTag: string;

    // Define a function to parse the HTML content
    function parseHTML(html: string) {
      // Create a new parser instance
      let parser = new Parser(
        {
          // Define the handlers for different events
          onopentag(name, attribs) {
            // If the tag is a link element, create a new bookmark object
            if (name === 'a') {
              let bookmark: Bookmark = {
                title: '',
                url: attribs['href'],
                image: attribs['icon'],
                description: '',
                tags: [],
              };
              // If the link element has a tags attribute, split it by comma and add to the bookmark object
              if (attribs['tags']) {
                bookmark.tags = attribs['tags'].split(',');
              }
              // Push the bookmark object to the bookmarks array
              bookmarks.push(bookmark);
            }
            // Update the current tag name
            currentTag = name;
          },
          ontext(text) {
            // If the current tag is a link element, update the title of the last bookmark object with the text content
            if (currentTag === 'a') {
              bookmarks[bookmarks.length - 1].title = text;
            }
          },
        },
        { decodeEntities: true }
      );
      // Parse the HTML content
      parser.write(html);
      parser.end();
    }

    // Define a function to convert the bookmarks array to JSON string
    function toJSON(bookmarks: Bookmark[]): string {
      // Use JSON.stringify with indentation of 2 spaces
      return JSON.stringify(bookmarks, null, 2);
    }

    // Read the HTML content from a file or other sources
    let html = file;

    // Parse the HTML content
    parseHTML(html);

    // Convert the bookmarks array to JSON string
    let json = toJSON(bookmarks);
    let data = JSON.parse(json as string);

    this.file = data;

    // Write the JSON string to a file or other destinations
    console.log(this.file); // For demonstration purpose only
  }
}
