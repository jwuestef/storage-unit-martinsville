import { Component, OnInit } from '@angular/core';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {



    constructor() {

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

    }


    
}
