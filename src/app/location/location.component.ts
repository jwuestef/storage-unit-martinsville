import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ContentService } from '../services/content.service';
import { AuthService } from '../services/auth.service';



@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent {
    mapLink;
    mapLinkDisplayed = '';
    mapLinkUpdated = false;
    locationParagraphUpdated = false;
    directions1Updated = false;
    directions2Updated = false;



    constructor(private contentService: ContentService, public authService: AuthService, public sanitizer: DomSanitizer) {
        // Pull content from Firebase and load it into the page content
        this.contentService.getPageContent('locationPage').then(pageContent => {
            // Set the paragraph contents
            this.mapLinkDisplayed = pageContent['mapLink'];
            this.mapLink = this.sanitizer.bypassSecurityTrustResourceUrl(pageContent['mapLink'])
            $('#locationParagraph').html(pageContent['locationParagraph']);
            $('#directions1').html(pageContent['directions1']);
            $('#directions2').html(pageContent['directions2']);
            if (this.authService.isAdmin) {
                // If they're an admin, set the content of paragraph editors
                setTimeout(() => {
                    tinymce.get('locationParagraphEditor').setContent(pageContent['locationParagraph']);
                    tinymce.get('directions1Editor').setContent(pageContent['directions1']);
                    tinymce.get('directions2Editor').setContent(pageContent['directions2']);
                }, 100)
            }
        })
    }



    saveMapLink() {
        this.mapLinkUpdated = false;
        const newContent = this.mapLinkDisplayed;
        if (newContent.trim() == '') {
            alert('Map link input field can not be empty');
            return;
        }
        this.contentService.savePageContent('locationPage', 'mapLink', newContent).then(() => {
            this.mapLink = newContent;
            this.contentService.siteContent['locationPage']['mapLink'] = newContent;
            this.mapLinkUpdated = true;
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.mapLinkUpdated = false;
            }, 2000);
        });
    }

    saveLocationParagraph() {
        this.locationParagraphUpdated = false;
        const newContent = tinymce.get('locationParagraphEditor').getContent();
        this.contentService.savePageContent('locationPage', 'locationParagraph', newContent).then(() => {
            $('#locationParagraph').html(newContent)
            this.contentService.siteContent['locationPage']['locationParagraph'] = newContent;
            this.locationParagraphUpdated = true;
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.locationParagraphUpdated = false;
            }, 2000);
        });
    }

    saveDirections1() {
        this.directions1Updated = false;
        const newContent = tinymce.get('directions1Editor').getContent();
        this.contentService.savePageContent('locationPage', 'directions1', newContent).then(() => {
            $('#directions1').html(newContent)
            this.contentService.siteContent['locationPage']['directions1'] = newContent;
            this.directions1Updated = true;
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.directions1Updated = false;
            }, 2000);
        });
    }

    saveDirections2() {
        this.directions2Updated = false;
        const newContent = tinymce.get('directions2Editor').getContent();
        this.contentService.savePageContent('locationPage', 'directions2', newContent).then(() => {
            $('#directions2').html(newContent)
            this.contentService.siteContent['locationPage']['directions2'] = newContent;
            this.directions2Updated = true;
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.directions2Updated = false;
            }, 2000);
        });
    }

    

}
