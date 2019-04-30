import { Component, OnInit } from '@angular/core';

import { Image } from '../services/image';
import { ContentService } from '../services/content.service';
import { AuthService } from '../services/auth.service';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    headerCurrentUpload: Image;
    backgroundCurrentUpload: Image;
    headerImageSrc: string;
    backgroundImageSrc: string;
    headerImageDesc: string;
    backgroundImageDesc: string;
    headerSelectedFile: FileList;
    backgroundSelectedFile: FileList;
    headerUploadingImage = false;
    backgroundUploadingImage = false;
    headerUploadingImageError = '';
    backgroundUploadingImageError = '';
    headerUploadPercentage;
    backgroundUploadPercentage;
    


    constructor(private contentService: ContentService, public authService: AuthService) {
        // Pull content from Firebase and load it into the page content
        this.contentService.getPageContent('siteOptions').then(pageContent => {
            // Set the image properties
            this.headerImageSrc = pageContent['headerImageSrc'];
            this.headerImageDesc = pageContent['headerImageDesc'];
            this.backgroundImageSrc = pageContent['backgroundImageSrc'];
            this.backgroundImageDesc = pageContent['backgroundImageDesc'];
            $('body').css('background', `url(${this.backgroundImageSrc}) no-repeat center center fixed`);
        })
    }



    ngOnInit() {

        switch(window.location.pathname) {
            case '/':
                $('#homeLink').addClass('active');
                break;
            case '/SizesAndPricing':
                $('#sizesAndPricingLink').addClass('active');
                break;
            case '/Location':
                $('#locationLink').addClass('active');
                break;
            case '/Specials':
                $('#specialsLink').addClass('active');
                break;
            case '/ContactUs':
                $('#contactLink').addClass('active');
                break;
            default:
                $('#homeLink').addClass('active');
                break;
        }

        $(".navbar-nav .nav-link").on("click", function () {
            $(".navbar-nav").find(".active").removeClass("active");
            $(this).addClass("active");
        });

        $('.navbar-nav > a').on('click', function(){
            ($('.navbar-collapse') as any).collapse('hide');
        });

    }



    headerDetectImage(event) {
        this.headerSelectedFile = event.target.files;
    }

    backgroundDetectImage(event) {
        this.backgroundSelectedFile = event.target.files;
    }



    headerUploadImage() {
        if (this.headerImageDesc.trim() === '') {
            this.headerUploadingImageError = 'Description is required';
            setTimeout(() => {
                this.headerUploadingImageError = '';
            }, 5000)
            return;
        }
        if (document.getElementById("headerImageFileInput")['files'].length !== 1) {
            this.headerUploadingImageError = 'You must choose an image';
            setTimeout(() => {
                this.headerUploadingImageError = '';
            }, 5000)
            return;
        }
        this.headerUploadingImageError = '';
        this.headerUploadingImage = true;
        // Set file-to-be-uploaded to the file taken from the input fields
        this.headerCurrentUpload = new Image(this.headerSelectedFile.item(0));
        this.headerCurrentUpload.description = this.headerImageDesc.trim();
        // Upload the file via ContentService function (pageName, whichElement, newImage)
        this.headerUploadPercentage = this.contentService.uploadPercent;
        this.contentService.uploadFile('siteOptions', 'headerImage', this.headerCurrentUpload).then(newURL => {
            // Updates thumbnail image
            this.headerImageSrc = newURL.toString();
            this.headerImageDesc = this.headerImageDesc.trim();
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.headerUploadingImage = false;
            }, 2000);
        }).catch(err => { console.log('Failed'); console.log(err); });
    }

    backgroundUploadImage() {
        if (this.backgroundImageDesc.trim() === '') {
            this.backgroundUploadingImageError = 'Description is required';
            setTimeout(() => {
                this.backgroundUploadingImageError = '';
            }, 5000)
            return;
        }
        if (document.getElementById("backgroundImageFileInput")['files'].length !== 1) {
            this.backgroundUploadingImageError = 'You must choose an image';
            setTimeout(() => {
                this.backgroundUploadingImageError = '';
            }, 5000)
            return;
        }
        this.backgroundUploadingImageError = '';
        this.backgroundUploadingImage = true;
        // Set file-to-be-uploaded to the file taken from the input fields
        this.backgroundCurrentUpload = new Image(this.backgroundSelectedFile.item(0));
        this.backgroundCurrentUpload.description = this.backgroundImageDesc.trim();
        // Upload the file via ContentService function (pageName, whichElement, newImage)
        this.backgroundUploadPercentage = this.contentService.uploadPercent;
        this.contentService.uploadFile('siteOptions', 'backgroundImage', this.backgroundCurrentUpload).then(newURL => {
            // Updates thumbnail image
            this.backgroundImageSrc = newURL.toString();
            this.backgroundImageDesc = this.backgroundImageDesc.trim();
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.backgroundUploadingImage = false;
            }, 2000);
        }).catch(err => { console.log('Failed'); console.log(err); });
    }





    
}
