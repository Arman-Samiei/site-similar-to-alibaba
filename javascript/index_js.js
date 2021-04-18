/**
 * Created by Arman Samiei on 6/17/2020.
 */
var hotel_cities_arr = document.getElementsByClassName("hotel-cities");
for (p = 0; p < hotel_cities_arr.length; p++) {
    hotel_cities_arr[p].onclick = hotel_cities_handler;
}
default_addre = "http://37.152.185.50:8080/hotels/istanbul";
default_addre = default_addre + "?dummy=" + (new Date()).getTime();
asynch_AJAX(default_addre, 'hotel-cities');
function asynch_AJAX(addre, type) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.kind_of = type;
    xmlhttp.onreadystatechange = process;
    xmlhttp.open("GET", addre, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(null);
}
function hotel_cities_handler() {
    var city;
    if (this.innerHTML === "استانبول")
        city = "istanbul";
    if (this.innerHTML === "دبی")
        city = "dubai";
    if (this.innerHTML === "پاریس")
        city = "paris";
    if (this.innerHTML === "آنکارا")
        city = "ankara";
    if (this.innerHTML === "باکو")
        city = "baku";
    if (this.innerHTML === "تفلیس")
        city = "tblisi";
    document.querySelector(".hotel-cities-selected").classList.remove("hotel-cities-selected");
    this.classList.add("hotel-cities-selected");
    var addre = "http://37.152.185.50:8080/hotels/" + city;
    addre = addre + "?dummy=" + (new Date()).getTime();
    asynch_AJAX(addre, 'hotel-cities');
}
function process() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            if(this.kind_of === 'hotel-cities')
                hotel_cities_parser(this.responseText);
            if(this.kind_of === 'show-hotel-cities')
                show_hotel_cities(this.responseText);
            if(this.kind_of === 'form-submitting'){
                console.log(this.responseText)
                form_submitting(this.responseText);

            }

        }
        else {
            window.alert("Error: " + this.statusText);
        }
    }
}
function form_submitting(response) {
    window.alert(response);
}
function hotel_cities_parser(response) {
    var city_objects_array = JSON.parse(response);
    var kadre_marboote;
    var city_object;
    for (i = 0; i < city_objects_array.length; i++) {
        kadre_marboote = document.querySelector("div.reserve-hotel div.grid-container a.grid-item:nth-child(" + (i + 1) + ")");
        city_object = city_objects_array[i];
        kadre_marboote.setAttribute("id", "hotel" + city_object._id);
        if (city_object.rate_number < 0) {
            images = kadre_marboote.getElementsByTagName("img");
            for (k = 0; k < images.length; k++) {
                images[k].setAttribute("src", "");
            }
            kadre_marboote.querySelector("div:nth-of-type(2) p").innerHTML = "";
            spans = kadre_marboote.querySelector("div:nth-of-type(3)").getElementsByTagName("span");
            for (k = 0; k < spans.length; k++) {
                spans[k].innerHTML = "";
            }
            if (kadre_marboote.querySelector("div:last-child>button") != null)
                kadre_marboote.querySelector("div:last-child").removeChild(kadre_marboote.querySelector("div:last-child>button"));
            kadre_marboote.style.display = "none";
            continue;
        }
        kadre_marboote.querySelector("img").setAttribute("src", city_object.image);
        if (city_object.name.length > 34)
            kadre_marboote.querySelector("div p").style.fontSize = "80%";
        kadre_marboote.querySelector("div p").innerHTML = city_object.name;
        for (j = 1; j <= city_object.stars; j++) {
            kadre_marboote.querySelector("div>span>img:nth-child(" + j + ")").setAttribute("src", "images/yellow-star1.png");
        }
        for (; j <= 5; j++) {
            kadre_marboote.querySelector("div>span>img:nth-child(" + j + ")").setAttribute("src", "images/grey-star.png");
        }
        kadre_marboote.querySelector("div:last-child>p>span:nth-of-type(1)").innerHTML = "شروع قیمت از";
        kadre_marboote.querySelector("div:last-child>p>span:nth-of-type(2)").innerHTML = "ریال";
        kadre_marboote.querySelector("div:last-child>p>span:last-child").innerHTML = "" + city_object.price;
        if (kadre_marboote.querySelector("div:last-child button") == null) {
            reserve_button = document.createElement("button");
            reserve_button.innerHTML = "مشاهده و رزرو";
            kadre_marboote.querySelector("div:last-child").appendChild(reserve_button);
        }
        kadre_marboote.style.display = "block";
    }
}
var hotels = document.querySelectorAll("div.reserve-hotel div.grid-container a.grid-item");
for (i = 0; i < hotels.length; i++) {
    hotels[i].onclick = anchor_hotels_handler;
}
function anchor_hotels_handler() {
    location = "hotel_specific_page.html?id=" + this.getAttribute("id").split("hotel")[1];
}
document.querySelector(".header-travel-options:nth-child(6)").onclick = document.querySelector("div.options a:nth-child(6)").onclick = hotel_reserve_handler;
function hotel_reserve_handler() {
    if (document.querySelector("a.selected-option") != null)
        document.querySelector('a.selected-option').classList.remove('selected-option');
    document.querySelector("div.options a:nth-child(6)").classList.add('selected-option');
    document.querySelector("#search-bar form").setAttribute('id', 'hotel-reserve-form');
    document.querySelector("#search-bar form").innerHTML =
        "<div>"
        + "<span>"
        + "<img src='images/loc-icon.jpg'>"
        + "</span>"
        + "<input type='text' name='txtSrc' placeholder='جستجوی مقصد یا هتل(داخلی و خارجی)' size='20' maxlength='64' readonly/>"
        + "</div>"
        + "<div>"
        + "<span>"
        + "<img src='images/calendar.png'>"
        + "</span>"
        + "<input type='text' name='txtTime' placeholder='1399/04/04' size='20' maxlength='64' />"
        + "</div>"
        + "<div>"
        + "<span>"
        + "<img src='images/calendar.png'>"
        + "</span>"
        + "<input type='text' name='txtTime' placeholder='1399/04/07' size='20' maxlength='64' />"
        + "</div>"
        + "<div>"
        + "<span>"
        + "<img src='images/person-male.png'>"
        + "</span>"
        + "<input type='text' name='txtNum' placeholder='2بزرگسال،1کودک' maxlength='64' />"
        + "</div>"
        + "<input class='form-button' type='submit' value='جستجو'/>";
    document.getElementById('hotel-reserve-form').querySelector(" div:first-child>input").onfocus = show_cities_box;
}
document.querySelector('#search-bar form').onsubmit = form_checker;
function form_checker(event) {
    if(document.querySelector('#hotel-reserve-form  div:first-child>input').value == '')
    {
        window.alert('همه فیلد ها رو پرکن دوست عزیز');
        event.preventDefault();
    }

    var date_reg = /^\d{4}\/\d{2}\/\d{2}$/;
    var date1_is_correct = date_reg.test(document.querySelector('form div:nth-of-type(2) input').value);
    var date2_is_correct = date_reg.test(document.querySelector('form div:nth-of-type(3) input').value);
    if((!date1_is_correct) || (!date2_is_correct)){
        window.alert('دوست عزیز فرمت درست تاریخ مانند 1399/04/05 میباشد.');
        event.preventDefault();
    }
    var guests_reg = /\d+بزرگسال،\d+کودک/;
    var guests_is_correct = guests_reg.test(document.querySelector('form div:nth-of-type(4) input').value);
    if(!guests_is_correct){
        window.alert('دوست عزیز فرمت درست تعداد میهمان ها مانند 2بزرگسال،1کودک میباشد.');
        event.preventDefault();
    }
    reserve_hotel_form_handler(document.querySelector('#hotel-reserve-form  div:first-child>input').value, document.querySelector('form div:nth-of-type(2) input').value, document.querySelector('form div:nth-of-type(3) input').value,document.querySelector('form div:nth-of-type(4) input').value, event);
}

function reserve_hotel_form_handler(city, date_from, date_to, guests, event) {
    date_from = date_from.split('/');
    date_to = date_to.split('/');
    var from = date_from[0] + "-" + date_from[1] + "-" + date_from[2];
    var to = date_to[0] + "-" + date_to[1] + "-" + date_to[2];
    var parsed_guests = guests.split('،');
    var parsed_guests_adults = parseInt(parsed_guests[0].split('بزرگسال'));
    var parsed_guests_kids = parseInt(parsed_guests[1].split('کودک'));
    var xml = '<hotel><city>' + city + '</city><from>' + from + '</from><to>' + to + '</to><guests><parents>' + parsed_guests_adults + '</parents><children>' + parsed_guests_kids + '</children></guests></hotel>';
    // console.log(xmlDoc);
    // xmlDoc.getElementsByTagName('city')[0].childNodes[0].createTextNode(city);
    // xmlDoc.getElementsByTagName('from')[0].childNodes[0].nodeValue = new Date(date_from[0], date_from[1], date_from[2]);
    // xmlDoc.getElementsByTagName('to')[0].childNodes[0].nodeValue = new Date(date_to[0], date_to[1], date_to[2]);
    // xmlDoc.getElementsByTagName('parents')[0].childNodes[0].nodeValue = parsed_guests_adults;
    // xmlDoc.getElementsByTagName('children')[0].childNodes[0].nodeValue = parsed_guests_kids;
    // console.log(xmlDoc);
    var dom_parser = new DOMParser();
    var xmlDoc = dom_parser.parseFromString(xml, "text/xml");
    var addre = 'http://37.152.185.50:8080/hotel/search';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.kind_of = 'form-submitting';
    xmlhttp.onreadystatechange = process;
    xmlhttp.open("POST", addre, true);
    xmlhttp.send(xmlDoc);
    console.log(xmlDoc);
    event.preventDefault();
}
function show_cities_box(){
    var show_cities_box_div = document.createElement('div');
    show_cities_box_div.setAttribute('id', 'show-cities-box');
    var show_cities_title = document.createElement('ul');
    var show_cities_domestic_hotels = document.createElement('li');
    show_cities_domestic_hotels.setAttribute('name', 'domestic_title');
    show_cities_domestic_hotels.innerHTML = 'هتل های داخلی';
    var show_cities_international_hotels = document.createElement('li');
    show_cities_international_hotels.setAttribute('name', 'international_title');
    show_cities_international_hotels.innerHTML = 'هتل های خارجی';
    show_cities_box_div.appendChild(show_cities_title);
    show_cities_title.appendChild(show_cities_domestic_hotels);
    show_cities_title.appendChild(show_cities_international_hotels);
    if (document.getElementById('show-cities-box') != null)
        document.getElementById('search-bar').replaceChild(show_cities_box_div,document.getElementById('show-cities-box'));
    else
        document.getElementById('search-bar').appendChild(show_cities_box_div);
    show_cities_domestic_hotels.onclick = show_cities_AJAX;
    show_cities_international_hotels.onclick = show_cities_AJAX;
    show_cities_domestic_hotels.click();
}
function show_cities_AJAX() {
    if(document.querySelector('.clicked-show-hotel-title') != null)
        document.querySelector('.clicked-show-hotel-title').classList.remove('clicked-show-hotel-title');
    this.classList.add('clicked-show-hotel-title');
    var addre = "http://37.152.185.50:8080/hotel/";
    if(this.getAttribute('name') === 'domestic_title') {
        addre += "domestic-cities";
    }
    else{
        addre += "international-cities";
    }
    asynch_AJAX(addre, 'show-hotel-cities');
}
function show_hotel_cities(response) {
    var cities_div = document.createElement('div');
    var cities_ul = document.createElement('ul');
    var cities_arr = JSON.parse(response);
    var cities_elements = [];
    for (var i = 0; i < cities_arr.length; i++){
        cities_elements[i] = document.createElement('li');
        cities_elements[i].innerHTML = cities_arr[i];
        cities_elements[i].onclick = show_cities_handler;
        cities_ul.appendChild(cities_elements[i]);
    }
    cities_div.appendChild(cities_ul);
    if(document.querySelector('#show-cities-box>div') != null)
        document.getElementById('show-cities-box').replaceChild(cities_div, document.querySelector('#show-cities-box>div'));
    else
        document.getElementById('show-cities-box').appendChild(cities_div);
}
function show_cities_handler() {
    document.getElementById('hotel-reserve-form').querySelector(" div:first-child>input").value = this.innerHTML;
}
function max(var1, var2) {
    if (var1 > var2)
        return var1;
    else
        return var2;
}
function min(var1, var2) {
    if(var1 > var2)
        return var2;
    else
        return var1;
}
document.body.onmousedown = body_mouse_click;

function body_mouse_click(event) {
    var show_cities_box = document.querySelector('#show-cities-box');
    if(show_cities_box == null)
        return;
    var form_input_coordinates = document.querySelector('form input:first-of-type').getBoundingClientRect();
    var show_cities_box_coordinates = show_cities_box.getBoundingClientRect();
    var right = max(form_input_coordinates.right, show_cities_box_coordinates.right);
    var left = min(form_input_coordinates.left, show_cities_box_coordinates.left);
    var top = min(form_input_coordinates.top, show_cities_box_coordinates.top);
    var bot = max(form_input_coordinates.bottom, show_cities_box_coordinates.bottom);
    if(event.clientX <= right && event.clientX >= left)
        if(event.clientY >= top && event.clientY <= bot)
        {
            return;
        }

    document.querySelector('#search-bar').removeChild(show_cities_box);
}

