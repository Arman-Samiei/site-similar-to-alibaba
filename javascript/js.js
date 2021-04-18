function signup_handler() {
    document.getElementsByTagName("form")[0].innerHTML =
        "<div>"
        +"<div class='form-group'>"
        +"<label for='signup-email'>ایمیل(الزامی)</label>"
        +"<input type='email' name='email' dir='ltr' id='signup-email'>"
        +"</div>"
        +"<div class='form-group'>"
        +"<label for='signup-phone'>تلفن همراه(الزامی)</label>"
    +"<input type='tel' name='tel' dir='ltr' id='signup-phone'>"
        +"</div>"
        +"</div>"
        +"<div>"
        +"<div class='form-group'>"
        +"<label for='signup-pass'>رمز عبور(الزامی)</label>"
        +"<input type='password' name='pass' dir='ltr' id='signup-pass'>"
        +"</div>"
        +"<div class='form-group'>"
        +"<label for='signup-repass'>تکرار رمز عبور(الزامی)</label>"
        +"<input type='password' name='repass' id='signup-repass' dir='ltr' autocomplete='current-password'>"
        +"</div>"
        +"</div>"
        +"<div>"
        +"<input type='checkbox' name='check1' value='accept rules'/><a href='https://www.alibaba.ir/policy' target='_blank'>قوانین و مقررات سفرهای علی بابا</a><span>را می پذیرم</span>"
        +"</div>"
        +"<div>"
        +"<input type='checkbox' name='check2' value='give informations'/><span>مایل به دریافت خبرنامه و ایمیل‌های علی‌بابا هستم</span>"
        +"</div>"
        +"<div>"
        +"<input type='submit' value='ثبت نام' />"
        +"</div>";
    document.querySelector(".forms>div").classList.remove("login-form");
    document.querySelector(".forms>div").classList.add("signup-form");

}
function login_handler() {
    document.getElementsByTagName("form")[0].innerHTML =
        "<div class='form-group'>"
        +"<label for='login-email'>ایمیل یا شماره همراه خود را وارد کنید</label>"
        +"<input type='email' name='email' dir='ltr' id='login-email'>"
        +"</div>"
        +"<div class='form-group'>"
        +"<label for='login-password'>رمز عبور خود را وارد کنید</label>"
        +"<input type='password' name='password' id='login-password' dir='ltr' autocomplete='current-password'>"
        +"</div>"
        +"<div>"
        +"<input type='submit' value='وارد شوید' />"
        +"</div>"
        +"<a href=''>بازیابی رمز عبور </a>"
        +"<a> ثبت نام </a>";
        document.querySelector(".forms>div").classList.remove("signup-form");
        document.querySelector(".forms>div").classList.add("login-form");
}
document.getElementById("sabtenam").onclick = signup_handler;
document.getElementById("entrance").onclick = login_handler;

/*------------------------------------------------------------------*/

