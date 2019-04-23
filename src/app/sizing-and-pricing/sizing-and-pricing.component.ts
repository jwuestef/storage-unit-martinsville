import { Component } from '@angular/core';

import { ContentService } from '../services/content.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../services/image';



@Component({
    selector: 'app-sizing-and-pricing',
    templateUrl: './sizing-and-pricing.component.html',
    styleUrls: ['./sizing-and-pricing.component.scss']
})
export class SizingAndPricingComponent {
    sapParagraphUpdated = false;
    sapCurrentUpload: Image;
    sapImage1Src: string;
    sapImage2Src: string;
    sapImage3Src: string;
    sapImage4Src: string;
    sapImage5Src: string;
    sapImage6Src: string;
    sapImage1Desc: string;
    sapImage2Desc: string;
    sapImage3Desc: string;
    sapImage4Desc: string;
    sapImage5Desc: string;
    sapImage6Desc: string;
    sapSelectedFile1: FileList;
    sapSelectedFile2: FileList;
    sapSelectedFile3: FileList;
    sapSelectedFile4: FileList;
    sapSelectedFile5: FileList;
    sapSelectedFile6: FileList;
    sapUploadingImage1 = false;
    sapUploadingImage2 = false;
    sapUploadingImage3 = false;
    sapUploadingImage4 = false;
    sapUploadingImage5 = false;
    sapUploadingImage6 = false;
    sapUploadingImage1Error = '';
    sapUploadingImage2Error = '';
    sapUploadingImage3Error = '';
    sapUploadingImage4Error = '';
    sapUploadingImage5Error = '';
    sapUploadingImage6Error = '';
    sapUploadPercentage;



    constructor(private contentService: ContentService, public authService: AuthService) {
        // Pull content from Firebase and load it into the page content
        this.contentService.getPageContent('sizesAndPricingPage').then(pageContent => {
            // Set the paragraph contents
            $('#sapParagraph').html(pageContent['sapParagraph']);
            // Set the image properties
            this.sapImage1Src = pageContent['image1Src'];
            this.sapImage2Src = pageContent['image2Src'];
            this.sapImage3Src = pageContent['image3Src'];
            this.sapImage4Src = pageContent['image4Src'];
            this.sapImage5Src = pageContent['image5Src'];
            this.sapImage6Src = pageContent['image6Src'];
            this.sapImage1Desc = pageContent['image1Desc'];
            this.sapImage2Desc = pageContent['image2Desc'];
            this.sapImage3Desc = pageContent['image3Desc'];
            this.sapImage4Desc = pageContent['image4Desc'];
            this.sapImage5Desc = pageContent['image5Desc'];
            this.sapImage6Desc = pageContent['image6Desc'];
            if (this.authService.isAdmin) {
                // If they're an admin, set the content of paragraph editors
                setTimeout(() => {
                    tinymce.get('sapParagraphEditor').setContent(pageContent['sapParagraph']);
                }, 100)
            }
        })
    }



    // As an admin, saves the content of the editor for the sap paragraph, and then shows a success message
    saveSapParagraph() {
        this.sapParagraphUpdated = false;
        const newContent = tinymce.get('sapParagraphEditor').getContent();
        this.contentService.savePageContent('sizesAndPricingPage', 'sapParagraph', newContent).then(() => {
            $('#sapParagraph').html(newContent)
            this.sapParagraphUpdated = true;
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.sapParagraphUpdated = false;
            }, 2000);
        });
    }



    sapDetectImage1(event) {
        this.sapSelectedFile1 = event.target.files;
    }

    sapDetectImage2(event) {
        this.sapSelectedFile2 = event.target.files;
    }

    sapDetectImage3(event) {
        this.sapSelectedFile3 = event.target.files;
    }

    sapDetectImage4(event) {
        this.sapSelectedFile4 = event.target.files;
    }

    sapDetectImage5(event) {
        this.sapSelectedFile5 = event.target.files;
    }

    sapDetectImage6(event) {
        this.sapSelectedFile6 = event.target.files;
    }



    sapUploadImage1() {
        if (this.sapImage1Desc.trim() === '' && document.getElementById("sapImage1FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image1Desc', this.sapImage1Desc.trim()).then(() => {
                this.sapUploadingImage1Error = 'Image now hidden';
                setTimeout(() => {
                    this.sapUploadingImage1Error = '';
                }, 5000)
            });
            return;
        }
        if (this.sapImage1Desc.trim() !== '' && document.getElementById("sapImage1FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image1Desc', this.sapImage1Desc.trim()).then(() => {
                this.sapUploadingImage1Error = 'Description Updated';
                setTimeout(() => {
                    this.sapUploadingImage1Error = '';
                }, 5000)
            });
        } 
        if (document.getElementById("sapImage1FileInput")['files'].length === 1) {
            this.sapUploadingImage1Error = '';
            this.sapUploadingImage1 = true;
            // Set file-to-be-uploaded to the file taken from the input fields
            this.sapCurrentUpload = new Image(this.sapSelectedFile1.item(0));
            this.sapCurrentUpload.description = this.sapImage1Desc.trim();
            // Upload the file via ContentService function (pageName, whichElement, newImage)
            this.sapUploadPercentage = this.contentService.uploadPercent;
            this.contentService.uploadFile('sizesAndPricingPage', 'image1', this.sapCurrentUpload).then(newURL => {
                // Updates thumbnail image
                this.sapImage1Src = newURL.toString();
                this.sapImage1Desc = this.sapImage1Desc.trim();
                // A few seconds after completion, hide the confirmation
                window.setTimeout(() => {
                    this.sapUploadingImage1 = false;
                }, 2000);
            }).catch(err => { console.log('Failed'); console.log(err); });
        }
    }

    sapUploadImage2() {
        if (this.sapImage2Desc.trim() === '' && document.getElementById("sapImage2FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image2Desc', this.sapImage2Desc.trim()).then(() => {
                this.sapUploadingImage2Error = 'Image now hidden';
                setTimeout(() => {
                    this.sapUploadingImage2Error = '';
                }, 5000)
            });
            return;
        }
        if (this.sapImage2Desc.trim() !== '' && document.getElementById("sapImage2FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image2Desc', this.sapImage2Desc.trim()).then(() => {
                this.sapUploadingImage2Error = 'Description Updated';
                setTimeout(() => {
                    this.sapUploadingImage2Error = '';
                }, 5000)
            });
        } 
        if (document.getElementById("sapImage2FileInput")['files'].length === 1) {
            this.sapUploadingImage2Error = '';
            this.sapUploadingImage2 = true;
            // Set file-to-be-uploaded to the file taken from the input fields
            this.sapCurrentUpload = new Image(this.sapSelectedFile2.item(0));
            this.sapCurrentUpload.description = this.sapImage2Desc.trim();
            // Upload the file via ContentService function (pageName, whichElement, newImage)
            this.sapUploadPercentage = this.contentService.uploadPercent;
            this.contentService.uploadFile('sizesAndPricingPage', 'image2', this.sapCurrentUpload).then(newURL => {
                // Updates thumbnail image
                this.sapImage2Src = newURL.toString();
                this.sapImage2Desc = this.sapImage2Desc.trim();
                // A few seconds after completion, hide the confirmation
                window.setTimeout(() => {
                    this.sapUploadingImage2 = false;
                }, 2000);
            }).catch(err => { console.log('Failed'); console.log(err); });
        }
    }

    sapUploadImage3() {
        if (this.sapImage3Desc.trim() === '' && document.getElementById("sapImage3FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image3Desc', this.sapImage3Desc.trim()).then(() => {
                this.sapUploadingImage3Error = 'Image now hidden';
                setTimeout(() => {
                    this.sapUploadingImage3Error = '';
                }, 5000)
            });
            return;
        }
        if (this.sapImage3Desc.trim() !== '' && document.getElementById("sapImage3FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image3Desc', this.sapImage3Desc.trim()).then(() => {
                this.sapUploadingImage3Error = 'Description Updated';
                setTimeout(() => {
                    this.sapUploadingImage3Error = '';
                }, 5000)
            });
        } 
        if (document.getElementById("sapImage3FileInput")['files'].length === 1) {
            this.sapUploadingImage3Error = '';
            this.sapUploadingImage3 = true;
            // Set file-to-be-uploaded to the file taken from the input fields
            this.sapCurrentUpload = new Image(this.sapSelectedFile3.item(0));
            this.sapCurrentUpload.description = this.sapImage3Desc.trim();
            // Upload the file via ContentService function (pageName, whichElement, newImage)
            this.sapUploadPercentage = this.contentService.uploadPercent;
            this.contentService.uploadFile('sizesAndPricingPage', 'image3', this.sapCurrentUpload).then(newURL => {
                // Updates thumbnail image
                this.sapImage3Src = newURL.toString();
                this.sapImage3Desc = this.sapImage3Desc.trim();
                // A few seconds after completion, hide the confirmation
                window.setTimeout(() => {
                    this.sapUploadingImage3 = false;
                }, 2000);
            }).catch(err => { console.log('Failed'); console.log(err); });
        }
    }

    sapUploadImage4() {
        if (this.sapImage4Desc.trim() === '' && document.getElementById("sapImage4FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image4Desc', this.sapImage4Desc.trim()).then(() => {
                this.sapUploadingImage4Error = 'Image now hidden';
                setTimeout(() => {
                    this.sapUploadingImage4Error = '';
                }, 5000)
            });
            return;
        }
        if (this.sapImage4Desc.trim() !== '' && document.getElementById("sapImage4FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image4Desc', this.sapImage4Desc.trim()).then(() => {
                this.sapUploadingImage4Error = 'Description Updated';
                setTimeout(() => {
                    this.sapUploadingImage4Error = '';
                }, 5000)
            });
        } 
        if (document.getElementById("sapImage4FileInput")['files'].length === 1) {
            this.sapUploadingImage4Error = '';
            this.sapUploadingImage4 = true;
            // Set file-to-be-uploaded to the file taken from the input fields
            this.sapCurrentUpload = new Image(this.sapSelectedFile4.item(0));
            this.sapCurrentUpload.description = this.sapImage4Desc.trim();
            // Upload the file via ContentService function (pageName, whichElement, newImage)
            this.sapUploadPercentage = this.contentService.uploadPercent;
            this.contentService.uploadFile('sizesAndPricingPage', 'image4', this.sapCurrentUpload).then(newURL => {
                // Updates thumbnail image
                this.sapImage4Src = newURL.toString();
                this.sapImage4Desc = this.sapImage4Desc.trim();
                // A few seconds after completion, hide the confirmation
                window.setTimeout(() => {
                    this.sapUploadingImage4 = false;
                }, 2000);
            }).catch(err => { console.log('Failed'); console.log(err); });
        }
    }

    sapUploadImage5() {
        if (this.sapImage5Desc.trim() === '' && document.getElementById("sapImage5FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image5Desc', this.sapImage5Desc.trim()).then(() => {
                this.sapUploadingImage5Error = 'Image now hidden';
                setTimeout(() => {
                    this.sapUploadingImage5Error = '';
                }, 5000)
            });
            return;
        }
        if (this.sapImage5Desc.trim() !== '' && document.getElementById("sapImage5FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image5Desc', this.sapImage5Desc.trim()).then(() => {
                this.sapUploadingImage5Error = 'Description Updated';
                setTimeout(() => {
                    this.sapUploadingImage5Error = '';
                }, 5000)
            });
        } 
        if (document.getElementById("sapImage5FileInput")['files'].length === 1) {
            this.sapUploadingImage5Error = '';
            this.sapUploadingImage5 = true;
            // Set file-to-be-uploaded to the file taken from the input fields
            this.sapCurrentUpload = new Image(this.sapSelectedFile5.item(0));
            this.sapCurrentUpload.description = this.sapImage5Desc.trim();
            // Upload the file via ContentService function (pageName, whichElement, newImage)
            this.sapUploadPercentage = this.contentService.uploadPercent;
            this.contentService.uploadFile('sizesAndPricingPage', 'image5', this.sapCurrentUpload).then(newURL => {
                // Updates thumbnail image
                this.sapImage5Src = newURL.toString();
                this.sapImage5Desc = this.sapImage5Desc.trim();
                // A few seconds after completion, hide the confirmation
                window.setTimeout(() => {
                    this.sapUploadingImage5 = false;
                }, 2000);
            }).catch(err => { console.log('Failed'); console.log(err); });
        }
    }

    sapUploadImage6() {
        if (this.sapImage6Desc.trim() === '' && document.getElementById("sapImage6FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image6Desc', this.sapImage6Desc.trim()).then(() => {
                this.sapUploadingImage6Error = 'Image now hidden';
                setTimeout(() => {
                    this.sapUploadingImage6Error = '';
                }, 5000)
            });
            return;
        }
        if (this.sapImage6Desc.trim() !== '' && document.getElementById("sapImage6FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image6Desc', this.sapImage6Desc.trim()).then(() => {
                this.sapUploadingImage6Error = 'Description Updated';
                setTimeout(() => {
                    this.sapUploadingImage6Error = '';
                }, 5000)
            });
        } 
        if (document.getElementById("sapImage6FileInput")['files'].length === 1) {
            this.sapUploadingImage6Error = '';
            this.sapUploadingImage6 = true;
            // Set file-to-be-uploaded to the file taken from the input fields
            this.sapCurrentUpload = new Image(this.sapSelectedFile6.item(0));
            this.sapCurrentUpload.description = this.sapImage6Desc.trim();
            // Upload the file via ContentService function (pageName, whichElement, newImage)
            this.sapUploadPercentage = this.contentService.uploadPercent;
            this.contentService.uploadFile('sizesAndPricingPage', 'image6', this.sapCurrentUpload).then(newURL => {
                // Updates thumbnail image
                this.sapImage6Src = newURL.toString();
                this.sapImage6Desc = this.sapImage6Desc.trim();
                // A few seconds after completion, hide the confirmation
                window.setTimeout(() => {
                    this.sapUploadingImage6 = false;
                }, 2000);
            }).catch(err => { console.log('Failed'); console.log(err); });
        }
    }



}
