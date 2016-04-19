(function (global) {
    var LoginViewModel;
	var app = global.app = global.app || {};
    
    //Remove this line when going into production!!!!!!
    //localStorage.setItem('registered',false);

    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        firstname:"",
        lastname:"",
        email:"",
        token:"",

        onLogin: function () {
             /*var that = this,
                username = that.get("firstname").trim(),
                password = that.get("password").trim(),
                email = that.get("email").trim(),
                token = that.get("token").trim();*/
            
            var loginInfo = new Object();
            loginInfo.firstname = this.get("firstname").trim();
            loginInfo.lastname = this.get("lastname").trim();
            loginInfo.email = this.get("email").trim();
            loginInfo.token = this.get("token").trim();
            
            if (this.firstname === "" || this.lastname === "" || this.email === "" || this.token === "") {
                navigator.notification.alert("all fields are required!",
                    function () { }, "Login failed", 'OK');
                return;
            }
            
            var loginUri = buildLoginRequestUri(loginInfo);
            
            $.ajax({
                url: loginUri,
                type: 'GET',
                dataType:'xml',
                xhrFields: {
                        withCredentials: true
                    },
                success: function (xml) {
                    $(xml).find('Result').each(function(){
                        handleLoginResult($(this).text());
                    });
                },
                error:function (xhr,error){
                    handleError();
                }
            });
        },

        onLogout: function () {
            var that = this;

            that.clearForm();
            that.set("isLoggedIn", false);
        },

        clearForm: function () {
            var that = this;

            that.set("username", "");
            that.set("password", "");
        },

        checkEnter: function (e) {
            var that = this;

            if (e.keyCode == 13) {
                $(e.target).blur();
                that.onLogin();
            }
        }
    });

    app.loginService = {
        viewModel: new LoginViewModel()
    };
    
    function buildLoginRequestUri(loginInfo){
            console.log(loginInfo);
            var uri = "http://app.birdbook.co.za:3142/public/Bird Book/Public Token Check.xml?";
            uri += "Email=" + loginInfo.email;
            uri += "&Token=" + loginInfo.token;
            uri += "&FirstName=" + loginInfo.firstname;
            uri += "&Surname=" + loginInfo.lastname;
            
            return uri;
        
        }
    
    function handleLoginResult(serverResponse) {
            if(serverResponse == "Registered"){
               localStorage.setItem('registered',true);
                app.loginService.viewModel.set("isLoggedIn", true);
               handlePostUserRegistration();
            } else if(serverResponse == "Fail: Already registered"){
                localStorage.setItem('registered',false);
            } else {
                localStorage.setItem('registered',false);
            }
            
            var humanReadableResponse = serverResponse.replace('Fail: ','');
            alert(humanReadableResponse);
        }
    
    function handleError(){
            alert("A problem occured during the login process. Please try again.");
        }
    
    function handlePostUserRegistration(){
            if(localStorage.registered && localStorage.registered == "true"){
                window.location.href= '#views/home.html';
            }
        }
})(window);