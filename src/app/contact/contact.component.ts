import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { ContentService } from '../services/content.service';
import { AuthService } from '../services/auth.service';



@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
    contactParagraphUpdated = false;
    // Contact request form
    contactRequestName = '';
    contactRequestPhone = '';
    contactRequestMessage = '';


    
    constructor(private contentService: ContentService, public authService: AuthService, private http: HttpClient) {
        // Pull content from Firebase and load it into the page content
        this.contentService.getPageContent('contactPage').then(pageContent => {
            // Set the paragraph contents
            $('#contactParagraph').html(pageContent['contactParagraph']);
            if (this.authService.isAdmin) {
                // If they're an admin, set the content of paragraph editors
                setTimeout(() => {
                    tinymce.get('contactParagraphEditor').setContent(pageContent['contactParagraph']);
                }, 100)
            }
        })
    }



    savecontactParagraph() {
        this.contactParagraphUpdated = false;
        const newContent = tinymce.get('contactParagraphEditor').getContent();
        this.contentService.savePageContent('contactPage', 'contactParagraph', newContent).then(() => {
            $('#contactParagraph').html(newContent)
            this.contentService.siteContent['contactPage']['contactParagraph'] = newContent;
            this.contactParagraphUpdated = true;
            // A few seconds after completion, hide the confirmation
            window.setTimeout(() => {
                this.contactParagraphUpdated = false;
            }, 2000);
        });
    }



    // Sends the contact message
    postMessage() {
        // Make the cursor show the progress icon, let the user know stuff is happening
        document.body.style.cursor = 'progress';
        // Prepare the object we're going to send
        const body = {
            contactRequestName: this.contactRequestName,
            contactRequestPhone: this.contactRequestPhone,
            contactRequestMessage: this.contactRequestMessage,
        };
        // Send the post request to update that user
        // Doing it this way, to the path /sendContactMessage instead of the full path, avoids CORS errors.
        // This path is set up in the firebase.json file to direct to the cloud function.
        // Meaning - this request WILL NOT WORK ON LOCAL HOST - it will only work when deployed to Firebase.
        this.http.post('/sendContactMessage', body).subscribe(
            data => {
                // We received a message back from the server. Display this message in a popup and reset the variables.
                document.body.style.cursor = 'default';
                alert(data['answer']);
                this.contactRequestName = '';
                this.contactRequestPhone = '';
                this.contactRequestMessage = '';
            },
            err => {
                document.body.style.cursor = 'default';
                alert('Error submitting form. Please contact us at JTAIndy@gmail.com.');
                console.log(err);
            },
            () => {
                document.body.style.cursor = 'default';
                this.contactRequestName = '';
                this.contactRequestPhone = '';
                this.contactRequestMessage = '';
            }
        )
    }



}
