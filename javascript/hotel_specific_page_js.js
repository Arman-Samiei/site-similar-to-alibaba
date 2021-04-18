/**
 * Created by Arman Samiei on 6/19/2020.
 */
urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');
hotel_addres = "http://37.152.185.50:8080/hotels/hotel/" + id;
asynch_AJAX(hotel_addres);
var hotel_object;
function hotels_parser() {
    var ingredients = document.querySelectorAll(".breadcrumb-item");
    for (i = 0; i < ingredients.length; i++) {
        ingredients[i].innerHTML = hotel_object.breadcrumbs[i];
    }
    document.querySelector(".hotel-name-stars h2").innerHTML = hotel_object.name;
    for (j = 1; j <= hotel_object.stars; j++) {
        document.querySelector(".hotel-name-stars span").querySelector("img:nth-child(" + j + ")").setAttribute("src", "images/yellow-star1.png");
    }
    for (; j <= 5; j++) {
        document.querySelector(".hotel-name-stars span").querySelector("img:nth-child(" + j + ")").setAttribute("src", "images/grey-star.png");
    }
    document.querySelector(".hotel-address>*").innerHTML = hotel_object.address;
    document.querySelector(".image-gallery-main-img>img").setAttribute('src', hotel_object.images[0]);
    document.querySelector(".image-gallery-main-img>img").setAttribute('name', 'image0');
    let thumbnails_image = document.querySelectorAll(".thumbnail>img");
    for (i = 0; i < thumbnails.length; i++) {
        thumbnails_image[i].setAttribute("src", hotel_object.images[i]);
    }
    var facilities_string = Object.entries(hotel_object.facilities);
    for (i = 0; i < facilities_string.length; i++) {
        if(i === 4)
            break;
        create_facility_in_html(facilities_string[i][0], facilities_string[i][1]);
    }
        create_moshahede('moshahede-hame');
}
function create_moshahede(moshahede_type) {
    var moshahede = document.createElement('div');
    moshahede.classList.add("moshahede");
    moshahede.setAttribute('id', moshahede_type);
    var span_string = (moshahede_type == 'moshahede-hame') ? "مشاهده همه امکانات" : "نمایش کمتر";
    moshahede.innerHTML = "<span>" + span_string + "</span>" + "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'>"
        +"<g fill-rule='evenodd'>"
        +"<polygon fill-rule='nonzero' points='10.466 3.06 11.173 3.767 6.002 8.939 .83 3.767 1.537 3.06 6.002 7.524'></polygon>"
        +"</g></svg>";
    document.querySelector('#hotel-equipments').appendChild(moshahede);
    moshahede.querySelector('span').onclick = moshahede_handler;
    moshahede.querySelector('svg').onclick = moshahede_handler;
}
function create_facility_in_html(key, facility_arr) {
    var facility_info = facilities_title_switch(key);
    var facility = document.createElement('div');
    facility.classList.add("hotel-equipments-description");
    var facility_image = document.createElement("img");
    facility_image.setAttribute('src', 'images/facilities_icons/icons' + facility_info[1] + '.png');
    facility_image.classList.add("hotel-equipments-description-icon");
    var facility_div = document.createElement('div');
    var facility_header = document.createElement('h4');
    facility_header.classList.add("hotel-equipments-description-header");
    facility_header.innerHTML = facility_info[0];
    var hotel_equipments_description_container = document.createElement("div");
    hotel_equipments_description_container.classList.add('hotel-equipments-description-container');
    facility.appendChild(facility_image);
    facility.appendChild(facility_div);
    facility_div.appendChild(facility_header);
    facility_div.appendChild(hotel_equipments_description_container);
    for (var i = 0; i < facility_arr.length; i++) {
        hotel_equipments_description_container.innerHTML += "<p class='hotel-equipments-description-items'>"
            + facility_arr[i] +
            "</p>";
    }
    document.querySelector('#hotel-equipments').appendChild(facility);
}
function facilities_title_switch(key) {
    var facility_info = [];
    switch (key) {
        case 'general':
            facility_info[0] = 'کلی';
            facility_info[1] = 0;
            break;
        case 'customer_services':
            facility_info[0] = 'خدمات دهی به مشتری';
            facility_info[1] = 1;
            break;
        case 'public_spaces':
            facility_info[0] = 'فضای عمومی';
            facility_info[1] = 2;
            break;
        case 'shopping':
            facility_info[0] = 'فروشگاه ها';
            facility_info[1] = 3;
            break;
        case 'transportation':
            facility_info[0] = 'سرویس حمل و نقل';
            facility_info[1] = 4;
            break;
        case 'sports':
            facility_info[0] = 'استخر و سالن های ورزشی و بدنسازی';
            facility_info[1] = 5;
            break;
        case 'housekeeping':
            facility_info[0] = 'خدمات نظافت اتاق';
            facility_info[1] = 6;
            break;
        case 'hotel_services':
            facility_info[0] = 'خدمات دهی هتل';
            facility_info[1] = 7;
            break;
        case 'activities':
            facility_info[0] = 'فعالیت ها';
            facility_info[1] = 8;
            break;
        case 'misc':
            facility_info[0] = 'متفرقه';
            facility_info[1] = 9;
            break;
        case 'entertainment':
            facility_info[0] = 'سرگرمی و خدمات خانواده';
            facility_info[1] = 10;
            break;
        case 'foods_and_drinks':
            facility_info[0] = 'خوردنی و اشامیدنی';
            facility_info[1] = 11;
            break;
        case 'business_meetings':
            facility_info[0] = 'امکانات هماهنگی جلسات تجاری';
            facility_info[1] = 12;
            break;
    }
    return facility_info;
}
function asynch_AJAX(addre) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = process;
    xmlhttp.open("GET", addre, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(null);
}
function process() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            hotel_object = JSON.parse(this.responseText);
            hotels_parser();
        }
        else {
            window.alert("Error: " + this.statusText);
        }
    }
}
buttons = document.querySelectorAll(".image-gallery-buttons div div");
for (i = 0; i < buttons.length; i++) {
    buttons[i].onclick = buttons_handler;
}
function buttons_handler() {
    var image_number = parseInt(document.querySelector(".image-gallery-main-img>img").getAttribute('name').split('image')[1]);
    main_image = document.querySelector(".image-gallery-main-img>img");
    var new_image_number;
    if (this.classList.contains('left-arrow')) {
        new_image_number = image_number - 1;
        if (new_image_number == -1)
            new_image_number = 5;
        main_image.setAttribute('src', hotel_object.images[new_image_number]);
        main_image.setAttribute('name', 'image' + (new_image_number))
    }
    else if (this.classList.contains('right-arrow')) {
        new_image_number = image_number + 1;
        if (new_image_number == 6)
            new_image_number = 0;
        main_image.setAttribute('src', hotel_object.images[new_image_number]);
        main_image.setAttribute('name', 'image' + (new_image_number))
    }
}
var thumbnails = document.querySelectorAll(".thumbnail");
for (i = 0; i < thumbnails.length; i++) {
    thumbnails[i].onclick = thumbnails_handler;
}
function thumbnails_handler() {
    var new_image_number = parseInt(this.getAttribute('id').split('thumbnail')[1]);
    main_image = document.querySelector(".image-gallery-main-img>img");
    main_image.setAttribute('src', hotel_object.images[new_image_number]);
    main_image.setAttribute('name', 'image' + (new_image_number))
}
var hotel_info_menu_items = document.querySelectorAll(".hotel-info-menu ul li");
for (i = 0; i < hotel_info_menu_items.length; i++) {
    hotel_info_menu_items[i].onclick = hotel_info_menu_handler;
}
function hotel_info_menu_handler() {
    previous_selected_hotel_info = document.querySelector("li.selected-hotel-info");
    if (previous_selected_hotel_info != null)
        previous_selected_hotel_info.classList.remove("selected-hotel-info");
    this.classList.add("selected-hotel-info");
    var anchor_target;
    if (this.querySelector('a').innerHTML === 'امکانات هتل')
        anchor_target = 'hotel-equipments';
    else if(this.querySelector('a').innerHTML === 'اتاق های موجود')
        anchor_target = 'empty-rooms';
}
function moshahede_handler() {
    var facilities_string = Object.entries(hotel_object.facilities);
    var moshahede_id = document.querySelector('.moshahede').getAttribute('id');
    document.getElementById('hotel-equipments').removeChild(document.querySelector('.moshahede'));
    if (moshahede_id === 'moshahede-hame'){
        for (i = 4; i < facilities_string.length; i++){
            create_facility_in_html(facilities_string[i][0], facilities_string[i][1]);
        }
        create_moshahede('moshahede-kamtar');
    }
    else{
        var hotel_equi = document.getElementById('hotel-equipments');
        hotel_equipments_descriptions_number = hotel_equi.childElementCount - 1;
        let i = hotel_equipments_descriptions_number - 4;
        for (; i > 0; i--){
            hotel_equi.removeChild(hotel_equi.lastChild);
        }
        create_moshahede('moshahede-hame');

    }


}