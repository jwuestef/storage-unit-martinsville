import { Component } from '@angular/core';

import { ContentService } from '../services/content.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../services/image';



@Component({
    selector: 'app-specials',
    templateUrl: './specials.component.html',
    styleUrls: ['./specials.component.scss']
})
export class SpecialsComponent {
    specialsParagraphUpdated = false;
    specialsCurrentUpload: Image;
    specialsImage1Src: string;
    specialsImage1Desc: string;
    specialsSelectedFile1: FileList;
    specialsUploadingImage1 = false;
    specialsUploadingImage1Error = '';
    specialsUploadPercentage;



    constructor(private contentService: ContentService, public authService: AuthService) {
        // Pull content from the packaged-up-with-the-site JSON file - used to immediately populate the page
        this.contentService.getInitialContent('specialsPage').then(initialContent => {
            this.handlePageContent(initialContent)
        })
        // Pull updated content from Firebase and load it into the page content
        this.contentService.getPageContent('specialsPage').then(finalContent => {
            this.handlePageContent(finalContent)
        })
    }
    
    
    
    // Regardless of how the data was obtained, show the content on the page
    handlePageContent(pageContent) {
        // Set the paragraph contents
        $('#specialsParagraph').html(pageContent['specialsParagraph']);
        // Set the image properties
        this.specialsImage1Src = pageContent['image1Src'];
        this.specialsImage1Desc = pageContent['image1Desc'];
        if (this.authService.isAdmin) {
            // If they're an admin, set the content of paragraph editors
            setTimeout(() => {
                tinymce.get('specialsParagraphEditor').setContent(pageContent['specialsParagraph']);
            }, 100)
        }
    }



    // As an admin, saves the content of the editor for the specials paragraph, and then shows a success message
    savespecialsParagraph() {
        this.specialsParagraphUpdated = false;
        const newContent = tinymce.get('specialsParagraphEditor').getContent();
        this.contentService.savePageContent('specialsPage', 'specialsParagraph', newContent).then(() => {
            $('#specialsParagraph').html(newContent)
            this.contentService.siteContent['specialsPage']['specialsParagraph'] = newContent;
            this.specialsParagraphUpdated = true;
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.specialsParagraphUpdated = false;
            }, 2000);
        });
    }



    specialsDetectImage1(event) {
        this.specialsSelectedFile1 = event.target.files;
    }



    specialsUploadImage1() {
        if (this.specialsImage1Desc.trim() === '') {
            this.specialsUploadingImage1Error = 'Description is required';
            setTimeout(() => {
                this.specialsUploadingImage1Error = '';
            }, 5000)
            return;
        }
        if (document.getElementById("specialsImage1FileInput")['files'].length !== 1) {
            this.specialsUploadingImage1Error = 'You must choose an image';
            setTimeout(() => {
                this.specialsUploadingImage1Error = '';
            }, 5000)
            return;
        }
        this.specialsUploadingImage1Error = '';
        this.specialsUploadingImage1 = true;
        // Set file-to-be-uploaded to the file taken from the input fields
        this.specialsCurrentUpload = new Image(this.specialsSelectedFile1.item(0));
        this.specialsCurrentUpload.description = this.specialsImage1Desc.trim();
        // Upload the file via ContentService function (pageName, whichElement, newImage)
        this.specialsUploadPercentage = this.contentService.uploadPercent;
        this.contentService.uploadFile('specialsPage', 'image1', this.specialsCurrentUpload).then(newURL => {
            // Updates thumbnail image
            this.specialsImage1Src = newURL.toString();
            this.specialsImage1Desc = this.specialsImage1Desc.trim();
            this.contentService.siteContent['specialsPage']['image1Src'] = newURL.toString();
            this.contentService.siteContent['specialsPage']['image1Desc'] = this.specialsImage1Desc.trim();
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.specialsUploadingImage1 = false;
            }, 2000);
        }).catch(err => { console.log('Failed'); console.log(err); });
    }



}
