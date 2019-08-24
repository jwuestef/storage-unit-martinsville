import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Image } from './image';
import * as originalContent from './originalContent.json';



@Injectable({
    providedIn: 'root',
})
export class ContentService {
    siteContent = {};
    uploadPercent: Observable<number>;
    downloadURL: Observable<string>;
    downloadURLString: string;
    downloadURLPromise: Promise<any>;



    // The contructor function runs automatically on service load, each and every time it's called
    constructor(public afd: AngularFireDatabase, private afs: AngularFireStorage) { }



    getInitialContent(pageName) {
        return new Promise( (resolve, reject) => {
            if (!originalContent || !originalContent["default"] || !originalContent["default"][pageName]) {
                resolve({})
            } else {
                resolve(originalContent["default"][pageName]);
            }
        })
    }



    // Retrieves and returns content for a particular page from Firebase
    getPageContent(pageName) {
        return new Promise( (resolve, reject) => {
            if (this.siteContent[pageName]) {
                resolve(this.siteContent[pageName])
            } else {
                this.afd.database.ref('/content').once('value').then(newSiteContent => {
                    this.siteContent = newSiteContent.val()
                    resolve(this.siteContent[pageName])
                })
            }
        })
    }



    // Saves a particular piece of page content
    savePageContent(pageName, whichElement, newContent) {
        return this.afd.database.ref('/content/' + pageName).update({ [whichElement]: newContent });
    }



    // Upload a file to storage
    uploadFile(pageName, whichElement, upload: Image) {
        return new Promise((resolve, reject) => {
            const _filePath = `${pageName}/${whichElement}/${upload.file.name}`;
            const ref = this.afs.ref(_filePath);
            const task = this.afs.upload(_filePath, upload.file);

            this.uploadPercent = task.percentageChanges();

            task.snapshotChanges().pipe(
                finalize(() => {
                    // After the observable (the upload task) finishes, put the new file's access URL in the database
                    this.downloadURLPromise = ref.getDownloadURL().toPromise().then(newUrl => {
                        this.afd.database.ref('/content/' + pageName + '/').update({
                            [`${whichElement}Desc`]: upload.description,
                            [`${whichElement}Src`]: newUrl
                        }).then(() => {
                            // Successfully updated database, return the new url
                            resolve(newUrl);
                        }).catch(err => {
                            // Error updating url in database, output error to console and show alert
                            console.log('Error updating new image URL inside content.service.ts:');
                            console.log(err);
                            alert('Failed to upload file URL to database. Please contact administrator.');
                            reject();
                        });
                    }).catch(err => {
                        // Error updating url in database, output error to console and show alert
                        console.log('Error updating new image URL inside content.service.ts:');
                        console.log(err);
                        alert('Failed to upload file URL to database. Please contact administrator.');
                        reject();
                    })
                })
            ).subscribe();

        }); // End of returned promise
    }



}
