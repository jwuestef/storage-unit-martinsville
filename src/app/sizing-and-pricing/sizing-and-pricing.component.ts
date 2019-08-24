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
    size1Dimensions = '';
    size2Dimensions = '';
    size3Dimensions = '';
    size4Dimensions = '';
    size5Dimensions = '';
    size6Dimensions = '';
    size1Price = '';
    size2Price = '';
    size3Price = '';
    size4Price = '';
    size5Price = '';
    size6Price = '';
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
        // Pull content from the packaged-up-with-the-site JSON file - used to immediately populate the page
        this.contentService.getInitialContent('sizesAndPricingPage').then(initialContent => {
            this.handlePageContent(initialContent)
        })
        // Pull updated content from Firebase and load it into the page content
        this.contentService.getPageContent('sizesAndPricingPage').then(finalContent => {
            this.handlePageContent(finalContent)
        })
    }
    
    
    
    // Regardless of how the data was obtained, show the content on the page
    handlePageContent(pageContent) {
        // Set the paragraph contents
        this.size1Dimensions = pageContent['sapParagraph']['size1Dimensions'];
        this.size2Dimensions = pageContent['sapParagraph']['size2Dimensions'];
        this.size3Dimensions = pageContent['sapParagraph']['size3Dimensions'];
        this.size4Dimensions = pageContent['sapParagraph']['size4Dimensions'];
        this.size5Dimensions = pageContent['sapParagraph']['size5Dimensions'];
        this.size6Dimensions = pageContent['sapParagraph']['size6Dimensions'];
        this.size1Price = pageContent['sapParagraph']['size1Price'];
        this.size2Price = pageContent['sapParagraph']['size2Price'];
        this.size3Price = pageContent['sapParagraph']['size3Price'];
        this.size4Price = pageContent['sapParagraph']['size4Price'];
        this.size5Price = pageContent['sapParagraph']['size5Price'];
        this.size6Price = pageContent['sapParagraph']['size6Price'];
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
                document.getElementById('size1DimensionsInput')['value'] = pageContent['sapParagraph']['size1Dimensions'];
                document.getElementById('size2DimensionsInput')['value'] = pageContent['sapParagraph']['size2Dimensions'];
                document.getElementById('size3DimensionsInput')['value'] = pageContent['sapParagraph']['size3Dimensions'];
                document.getElementById('size4DimensionsInput')['value'] = pageContent['sapParagraph']['size4Dimensions'];
                document.getElementById('size5DimensionsInput')['value'] = pageContent['sapParagraph']['size5Dimensions'];
                document.getElementById('size6DimensionsInput')['value'] = pageContent['sapParagraph']['size6Dimensions'];
                document.getElementById('size1PriceInput')['value'] = pageContent['sapParagraph']['size1Price'];
                document.getElementById('size2PriceInput')['value'] = pageContent['sapParagraph']['size2Price'];
                document.getElementById('size3PriceInput')['value'] = pageContent['sapParagraph']['size3Price'];
                document.getElementById('size4PriceInput')['value'] = pageContent['sapParagraph']['size4Price'];
                document.getElementById('size5PriceInput')['value'] = pageContent['sapParagraph']['size5Price'];
                document.getElementById('size6PriceInput')['value'] = pageContent['sapParagraph']['size6Price'];
            }, 100)
        }
    }



    // As an admin, saves the content of the editor for the sap paragraph, and then shows a success message
    saveSapParagraph() {
        this.sapParagraphUpdated = false;
        const newContent = {
            size1Dimensions: document.getElementById('size1DimensionsInput')['value'],
            size2Dimensions: document.getElementById('size2DimensionsInput')['value'],
            size3Dimensions: document.getElementById('size3DimensionsInput')['value'],
            size4Dimensions: document.getElementById('size4DimensionsInput')['value'],
            size5Dimensions: document.getElementById('size5DimensionsInput')['value'],
            size6Dimensions: document.getElementById('size6DimensionsInput')['value'],
            size1Price: document.getElementById('size1PriceInput')['value'],
            size2Price: document.getElementById('size2PriceInput')['value'],
            size3Price: document.getElementById('size3PriceInput')['value'],
            size4Price: document.getElementById('size4PriceInput')['value'],
            size5Price: document.getElementById('size5PriceInput')['value'],
            size6Price: document.getElementById('size6PriceInput')['value'],
        };
        this.contentService.savePageContent('sizesAndPricingPage', 'sapParagraph', newContent).then(() => {
            this.contentService.siteContent['sizesAndPricingPage']['sapParagraph'] = newContent;
            this.size1Dimensions = newContent['size1Dimensions'];
            this.size2Dimensions = newContent['size2Dimensions'];
            this.size3Dimensions = newContent['size3Dimensions'];
            this.size4Dimensions = newContent['size4Dimensions'];
            this.size5Dimensions = newContent['size5Dimensions'];
            this.size6Dimensions = newContent['size6Dimensions'];
            this.size1Price = newContent['size1Price'];
            this.size2Price = newContent['size2Price'];
            this.size3Price = newContent['size3Price'];
            this.size4Price = newContent['size4Price'];
            this.size5Price = newContent['size5Price'];
            this.size6Price = newContent['size6Price'];
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
                this.contentService.siteContent['sizesAndPricingPage']['image1Desc'] = this.sapImage1Desc.trim();
                this.sapUploadingImage1Error = 'Image now hidden';
                setTimeout(() => {
                    this.sapUploadingImage1Error = '';
                }, 5000)
            });
            return;
        }
        if (this.sapImage1Desc.trim() !== '' && document.getElementById("sapImage1FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image1Desc', this.sapImage1Desc.trim()).then(() => {
                this.contentService.siteContent['sizesAndPricingPage']['image1Desc'] = this.sapImage1Desc.trim();
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
                this.contentService.siteContent['sizesAndPricingPage']['image1Src'] = newURL.toString();
                this.contentService.siteContent['sizesAndPricingPage']['image1Desc'] = this.sapImage1Desc.trim();
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
                this.contentService.siteContent['sizesAndPricingPage']['image2Desc'] = this.sapImage2Desc.trim();
                this.sapUploadingImage2Error = 'Image now hidden';
                setTimeout(() => {
                    this.sapUploadingImage2Error = '';
                }, 5000)
            });
            return;
        }
        if (this.sapImage2Desc.trim() !== '' && document.getElementById("sapImage2FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image2Desc', this.sapImage2Desc.trim()).then(() => {
                this.contentService.siteContent['sizesAndPricingPage']['image2Desc'] = this.sapImage2Desc.trim();
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
                this.contentService.siteContent['sizesAndPricingPage']['image2Src'] = newURL.toString();
                this.contentService.siteContent['sizesAndPricingPage']['image2Desc'] = this.sapImage2Desc.trim();
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
                this.contentService.siteContent['sizesAndPricingPage']['image3Desc'] = this.sapImage3Desc.trim();
                this.sapUploadingImage3Error = 'Image now hidden';
                setTimeout(() => {
                    this.sapUploadingImage3Error = '';
                }, 5000)
            });
            return;
        }
        if (this.sapImage3Desc.trim() !== '' && document.getElementById("sapImage3FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image3Desc', this.sapImage3Desc.trim()).then(() => {
                this.contentService.siteContent['sizesAndPricingPage']['image3Desc'] = this.sapImage3Desc.trim();
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
                this.contentService.siteContent['sizesAndPricingPage']['image3Src'] = newURL.toString();
                this.contentService.siteContent['sizesAndPricingPage']['image3Desc'] = this.sapImage3Desc.trim();
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
                this.contentService.siteContent['sizesAndPricingPage']['image4Desc'] = this.sapImage4Desc.trim();
                this.sapUploadingImage4Error = 'Image now hidden';
                setTimeout(() => {
                    this.sapUploadingImage4Error = '';
                }, 5000)
            });
            return;
        }
        if (this.sapImage4Desc.trim() !== '' && document.getElementById("sapImage4FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image4Desc', this.sapImage4Desc.trim()).then(() => {
                this.contentService.siteContent['sizesAndPricingPage']['image4Desc'] = this.sapImage4Desc.trim();
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
                this.contentService.siteContent['sizesAndPricingPage']['image4Src'] = newURL.toString();
                this.contentService.siteContent['sizesAndPricingPage']['image4Desc'] = this.sapImage4Desc.trim();
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
                this.contentService.siteContent['sizesAndPricingPage']['image5Desc'] = this.sapImage5Desc.trim();
                this.sapUploadingImage5Error = 'Image now hidden';
                setTimeout(() => {
                    this.sapUploadingImage5Error = '';
                }, 5000)
            });
            return;
        }
        if (this.sapImage5Desc.trim() !== '' && document.getElementById("sapImage5FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image5Desc', this.sapImage5Desc.trim()).then(() => {
                this.contentService.siteContent['sizesAndPricingPage']['image5Desc'] = this.sapImage5Desc.trim();
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
                this.contentService.siteContent['sizesAndPricingPage']['image5Src'] = newURL.toString();
                this.contentService.siteContent['sizesAndPricingPage']['image5Desc'] = this.sapImage5Desc.trim();
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
                this.contentService.siteContent['sizesAndPricingPage']['image6Desc'] = this.sapImage6Desc.trim();
                this.sapUploadingImage6Error = 'Image now hidden';
                setTimeout(() => {
                    this.sapUploadingImage6Error = '';
                }, 5000)
            });
            return;
        }
        if (this.sapImage6Desc.trim() !== '' && document.getElementById("sapImage6FileInput")['files'].length !== 1) {
            this.contentService.savePageContent('sizesAndPricingPage', 'image6Desc', this.sapImage6Desc.trim()).then(() => {
                this.contentService.siteContent['sizesAndPricingPage']['image6Desc'] = this.sapImage6Desc.trim();
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
                this.contentService.siteContent['sizesAndPricingPage']['image6Src'] = newURL.toString();
                this.contentService.siteContent['sizesAndPricingPage']['image6Desc'] = this.sapImage6Desc.trim();
                // A few seconds after completion, hide the confirmation
                window.setTimeout(() => {
                    this.sapUploadingImage6 = false;
                }, 2000);
            }).catch(err => { console.log('Failed'); console.log(err); });
        }
    }



}
