import { Component } from '@angular/core';

import { ContentService } from '../services/content.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../services/image';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    homeParagraphUpdated = false;
    homeCurrentUpload: Image;
    homeImage1Src: string;
    homeImage1Desc: string;
    homeSelectedFile1: FileList;
    homeUploadingImage1 = false;
    homeUploadingImage1Error = '';
    homeUploadPercentage;



    constructor(private contentService: ContentService, public authService: AuthService) {
        // Pull content from the packaged-up-with-the-site JSON file - used to immediately populate the page
        this.contentService.getInitialContent('homePage').then(initialContent => {
            this.handlePageContent(initialContent)
        })
        // Pull updated content from Firebase and load it into the page content
        this.contentService.getPageContent('homePage').then(finalContent => {
            this.handlePageContent(finalContent)
        })
    }



    // Regardless of how the data was obtained, show the content on the page
    handlePageContent(pageContent) {
        // Set the paragraph contents
        $('#homeParagraph').html(pageContent['homeParagraph']);
        // Set the image properties
        this.homeImage1Src = pageContent['homeImageSrc'];
        this.homeImage1Desc = pageContent['homeImageDesc'];
        if (this.authService.isAdmin) {
            // If they're an admin, set the content of paragraph editors
            setTimeout(() => {
                tinymce.get('homeParagraphEditor').setContent(pageContent['homeParagraph']);
            }, 100)
        }
    }



    // As an admin, saves the content of the editor for the home paragraph, and then shows a success message
    saveHomeParagraph() {
        this.homeParagraphUpdated = false;
        const newContent = tinymce.get('homeParagraphEditor').getContent();
        this.contentService.savePageContent('homePage', 'homeParagraph', newContent).then(() => {
            $('#homeParagraph').html(newContent)
            this.contentService.siteContent['homePage']['homeParagraph'] = newContent;
            this.homeParagraphUpdated = true;
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.homeParagraphUpdated = false;
            }, 2000);
        });
    }



    homeDetectImage1(event) {
        this.homeSelectedFile1 = event.target.files;
    }



    homeUploadImage1() {
        if (this.homeImage1Desc.trim() === '') {
            this.homeUploadingImage1Error = 'Description is required';
            setTimeout(() => {
                this.homeUploadingImage1Error = '';
            }, 5000)
            return;
        }
        if (document.getElementById("homeImage1FileInput")['files'].length !== 1) {
            this.homeUploadingImage1Error = 'You must choose an image';
            setTimeout(() => {
                this.homeUploadingImage1Error = '';
            }, 5000)
            return;
        }
        this.homeUploadingImage1Error = '';
        this.homeUploadingImage1 = true;
        // Set file-to-be-uploaded to the file taken from the input fields
        this.homeCurrentUpload = new Image(this.homeSelectedFile1.item(0));
        this.homeCurrentUpload.description = this.homeImage1Desc.trim();
        // Upload the file via ContentService function (pageName, whichElement, newImage)
        this.homeUploadPercentage = this.contentService.uploadPercent;
        this.contentService.uploadFile('homePage', 'homeImage', this.homeCurrentUpload).then(newURL => {
            // Updates thumbnail image
            this.homeImage1Src = newURL.toString();
            this.homeImage1Desc = this.homeImage1Desc.trim();
            this.contentService.siteContent['homePage']['homeImageSrc'] = newURL.toString();
            this.contentService.siteContent['homePage']['homeImageDesc'] = this.homeImage1Desc.trim();
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.homeUploadingImage1 = false;
            }, 2000);
        }).catch(err => { console.log('Failed'); console.log(err); });
    }



}
