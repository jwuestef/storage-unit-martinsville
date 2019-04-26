import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ContentService } from '../services/content.service';
import { AuthService } from '../services/auth.service';



@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    facebookLink;
    facebookLinkDisplayed = '';
    facebookLinkUpdated = false;
    phoneNumberParagraphUpdated = false;
    addressParagraphUpdated = false;
    mapLink;
    mapLinkDisplayed = '';
    mapLinkUpdated = false;



    constructor(private contentService: ContentService, public authService: AuthService, public sanitizer: DomSanitizer) {
        // Pull content from Firebase and load it into the page content
        this.contentService.getPageContent('siteOptions').then(pageContent => {
            // Set the paragraph contents
            this.facebookLinkDisplayed = pageContent['footerFacebookLink'];
            this.mapLinkDisplayed = pageContent['footerMapLink'];
            this.facebookLink = pageContent['footerFacebookLink']
            this.mapLink = this.sanitizer.bypassSecurityTrustResourceUrl(pageContent['footerMapLink'])

            $('#phoneNumberParagraph').html(pageContent['footerPhoneNumberParagraph']);
            $('#addressParagraph').html(pageContent['footerAddressParagraph']);

            if (this.authService.isAdmin) {
                // If they're an admin, set the content of paragraph editors
                setTimeout(() => {
                    tinymce.get('phoneNumberParagraphEditor').setContent(pageContent['footerPhoneNumberParagraph']);
                    tinymce.get('addressParagraphEditor').setContent(pageContent['footerAddressParagraph']);
                }, 100)
            }
        })
    }



    saveFacebookLink() {
        this.facebookLinkUpdated = false;
        const newContent = this.facebookLinkDisplayed;
        if (newContent.trim() == '') {
            alert('facebook link input field can not be empty');
            return;
        }
        this.contentService.savePageContent('locationPage', 'footerFacebookLink', newContent).then(() => {
            this.facebookLink = newContent;
            this.contentService.siteContent['locationPage']['footerFacebookLink'] = newContent;
            this.facebookLinkUpdated = true;
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.facebookLinkUpdated = false;
            }, 2000);
        });
    }

    saveMapLink() {
        this.mapLinkUpdated = false;
        const newContent = this.mapLinkDisplayed;
        if (newContent.trim() == '') {
            alert('Map link input field can not be empty');
            return;
        }
        this.contentService.savePageContent('siteOptions', 'footerMapLink', newContent).then(() => {
            this.mapLink = newContent;
            this.contentService.siteContent['siteOptions']['footerMapLink'] = newContent;
            this.mapLinkUpdated = true;
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.mapLinkUpdated = false;
            }, 2000);
        });
    }

    savePhoneNumberParagraph() {
        this.phoneNumberParagraphUpdated = false;
        const newContent = tinymce.get('phoneNumberParagraphEditor').getContent();
        this.contentService.savePageContent('siteOptions', 'footerPhoneNumberParagraph', newContent).then(() => {
            $('#phoneNumberParagraph').html(newContent)
            this.contentService.siteContent['siteOptions']['footerPhoneNumberParagraph'] = newContent;
            this.phoneNumberParagraphUpdated = true;
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.phoneNumberParagraphUpdated = false;
            }, 2000);
        });
    }

    saveAddressParagraph() {
        this.addressParagraphUpdated = false;
        const newContent = tinymce.get('addressParagraphEditor').getContent();
        this.contentService.savePageContent('siteOptions', 'footerAddressParagraph', newContent).then(() => {
            $('#addressParagraph').html(newContent)
            this.contentService.siteContent['siteOptions']['footerAddressParagraph'] = newContent;
            this.addressParagraphUpdated = true;
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.addressParagraphUpdated = false;
            }, 2000);
        });
    }



}
