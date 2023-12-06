# CosyncAuthReactNative

The CosyncAuthReactNative package is used to add functional bindings between a React Native application and the CosyncAuth service. To install this package into a React Native application do the following

---

# Installation in React Native

1. npm i cosync-auth-react-native --save

# Function API

The CosyncAuthReactNative provides a number of node functions

---

## configure

Create new instant to use the CosyncAuthReactNative to operate with a REST API that implements the CosyncAuth service protocol. This function should be called once at the time the application starts up.

```
import CosyncAuthReactNative from 'cosync-auth-react-native';
let cosync = new CosyncAuthReactNative({appToken: String, apiUrl: String}).getInstance();
```

### Parameters

**appToken** : String - this contains the application token for CosyncAuth (usually retrieved from the Keys section of the Cosync Portal.

**apiUrl** : String - this optional parameter contains the HTTPS REST API address for the CosyncAuth service. The default is 'https://sandbox.cosync.net'if not specified.

### Example

```
let cosync = new CosyncAuthReactNative({appToken: String, apiUrl: String}).getInstance();
```

## loginAnonymous

The _loginAnonymous()_ function is used to login into a anonymous user's account and create anonymous account if the user doesn't exist. If the login is successful, a login credentials will resolve result from this function vice versa:

- **jwt**: the JWT token of the logged in user
- **access-token**: the access token of the logged in user


```
loginAnonymous(handle) {
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```


### Parameters

**handle** : String - this contains the user's handle (ANON_[UUID]). 

### Example

```
cosync.login.loginAnonymous(handle).then(result => {
	// login result here...
	// jwt, access-token or login-token

	let jwt = result['jwt'];
	let accessToken = result['access-token'];

	or

	let loginToken = result['login-token'];

}).catch(err => {
	// login invalid result here...
	// code, message
	let code = err.code;
	let message = err.message;

})
```
 
## login

The _login()_ function is used to login into a user's account. If the login is successful, a login credentials will resolve result from this function vice versa:

- **jwt**: the JWT token of the logged in user
- **access-token**: the access token of the logged in user

```
login(handle, password) {
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

If the application has enabled 2-factor google or phone verification, and the user has enabled 2-factor verification for his/her account, the **jwt** and **access-token** will be set to **undefined**, and the CosyncAuth service will return **login-token**

This **login-token** will be used by the _loginComplete()_ function, which is passed a 2FA code sent to the user - either through the Google authenticator for Google Authentication or through Twilio for phone 2FA authentication.

### Parameters

**handle** : String - this contains the user's handle or email.

**password** : String - this contains the user's password.

### Example

```
cosync.login.login(handle, password).then(result => {
	// login result here...
	// jwt, access-token or login-token

	let jwt = result['jwt'];
	let accessToken = result['access-token'];

	or

	let loginToken = result['login-token'];

}).catch(err => {
	// login invalid result here...
	// code, message
	let code = err.code;
	let message = err.message;

})
```

## loginComplete

The _loginComplete()_ function is used to complete a login into a user's account with a 2FA code - provided by the Google authenticator or from a Twilio SMS message for phone 2FA verification.

If the loginComplete is successful, a login credentials will resolve result from this function vice versa:

- **jwt**: the JWT token of the logged in user
- **accessToken**: the access token of the logged in user

```
loginComplete(loginToken, loginCode){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

### Parameters

**loginToken** : String - this is a signed token from login function result
**code** : String - this contains the 6 digit code from the Google Authenticator or Twilio SMS

### Example

```
cosync.login.loginComplete(loginToken, loginCode).then(result => {

	// login result here...
	// jwt, access-token
	let jwt = result['jwt'];
	let accessToken = result['access-token'];

}).catch(err => {
	// login invalid result here...
	// code, message
	let code = err.code;
	let message = err.message;

})
```

## realm login

## signup

The _signup()_ function is used to signup a user with a CosyncAuth application. This function may cause the CosyncAuth service to verify the handle email of the user signing up. This verification is done by either sending a six digit verification code to the handle associated with the user account if the signup flow is `code`, otherwise it sends an email link to the handle that the user can click if the signup flow is `link`. If the signup flow is `none`, no verification of the handle is required. If the signup is successful, the _signup()_ function will resolve result from this function vice versa:

Metadata associated with the user is passed in as part of the signup process in the **metadata** parameter. The metadata is passed in as JSON object. The format of the metadata is specified in the Cosync Portal for the specific application in the **JWT** tab under the _Metadata Fields_ section.

```
signup(handle, password, metadata){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

### Parameters

**handle** : String - this contains the user's handle or email.

**password** : String - this contains the user's password.

**metadata** : Object - JSON object of the metadata.

### Example

```
let metadata = {
	user_data:{
		name:{
			first: "Jonh",
			last: "Doe"
		}
	}
};

cosync.signup.signup(handle,password, metadata).then(result => {

	// signup result is true

}).catch(err => {
	// signup invalid result here...
	// code, message
	let code = err.code;
	let message = err.message;

})

```

## completeSignup

The _completeSignup()_ function is used to complete a signup of a user with a CosyncAuth application, if the developer has selected `code` as the _signup flow_ within the Cosync Portal. The _completeSignup()_ function should be called after the user has been emailed a six-digit code to verify his/her email handle with CosyncAuth. This function call is not necessary if the developer has selected `link` or `none` as the signup flow for the application.

If the call to _completeSignup()_ is successful, the function will resolve result from this function vice versa:

```
completeSignup(handle, code){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}

```

### Parameters

**handle** : String - this contains the user's handle or email.

**code** : String - this contains the six-digit code sent to the user's email

### Example

```
cosync.signup.completeSignup(handle, code).then(result => {

	// signup result here...
	// jwt, access-token
	let jwt = result['jwt'];
	let accessToken = result['access-token'];

}).catch(err => {
	// signup invalid result here...
	// code, message
	let code = err.code;
	let message = err.message;

})
```


## socialLogin

The _socialLogin()_ function is used to login with Google/Apple button to a CosyncAuth application.

If the call to _socialLogin()_ is successful, the function will resolve result from this function vice versa:

```
socialLogin(token, provider){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}

```

### Parameters

**token** : String - this contains the authentication token of Google/Apple Id.

**provider** : String - this contains string either 'apple' or 'google'

### Example

```
cosync.signup.socialLogin(token, provider).then(result => {

	// signup result here...
	// jwt, access-token
	let jwt = result['jwt'];
	let accessToken = result['access-token'];

}).catch(err => {
	// socialLogin invalid result here...
	// code, message
	let code = err.code;
	let message = err.message;

})
```

## invite

The _invite()_ function is used to invite a user email into the CosyncAuth application. It is an alternative onboarding process to the _signup()_ function. Invitation is done by the logged in user to another potential user's email. When a user is "invited" into a CosyncAuth application, he/she will receive and email to that effect. Similar the signup process, an invitation can also have attached metadata to it. The invited user email will be sent a six-digit code to validate the email at the time of onboarding during the "register()\* function call.

Invite metadata associated with the user is passed in as part of the invite process in the **metadata** parameter. The metadata is passed in as JSON object. The format of the metadata is specified in the Cosync Portal for the specific application in the **JWT** tab under the _Invite Metadata Fields_ section. The invite metadata could be used to encode a coupon value for the invited user, or any other data the developer sees fit.

The invitation process will also need to record the unique Realm user id of the inviting user. This is stored within the _senderUserId_ parameter of the _invite()_ function. If the _senderUserId_ is not provided, the function will use current logged in Realm user id.

```
invite( handle, metadata, senderUserId){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

### Parameters

**handle** : String - this contains the user's handle or email.

**senderUserId** : String - Realm user Id of inviting user

**metadata** : Object - JSON object of the invite metadata.

### Example

```
let metadata = {
	invite_data: {
		coupon: "premium"
	}
};

cosync.profile.invite(userEmail, metadata, senderUserId).then(result => {

	 // invite result is true

}).catch(err => {
	// invalid result here...
	// code, message
	let code = err.code;
	let message = err.message;

})

```

## register

The _register()_ function is used to complete the invite of a user with a CosyncAuth application. When an inviting user issues a call to the _invite()_ function, the invited user email will be sent an email with a six-digit code associated with the invite. This code is passed by the invited user in the _code_ parameter during a call to the _register()_ function.

Metadata associated with the invited user is passed in as part of the register process in the **metadata** parameter. The metadata is passed in as JSON dictionary string. This is the invited user's metadata, which is different from the _Invite Metadata_ passed in by the inviting user in the _invite(()_ function call. The format of the metadata is specified in the Cosync Portal for the specific application in the **JWT** tab under the _Metadata Fields_ section.

If the call to _register()_ is successful, the function will resolve result from this function vice versa:

```
register(handle, password, code, metadata){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

### Parameters

**handle** : String - this contains the user's handle or email.

**password** : String - this contains the user's password.

**metadata** : String - JSON object of the metadata.

**code** : String - this contains the six-digit code sent to the user's email

### Example

```
let metadata = {
	user_data:{
		name:{
			first: "Jonh",
			last: "Doe"
		}
	}
};


cosync.register.register(handle, password, code, metadata).then(result => {

	// register result here...
	// jwt, access-token
	let jwt = result['jwt'];
	let accessToken = result['access-token'];

}).catch(err => {
	// invalid result here...
	// code, message
	let code = err.code;
	let message = err.message;

})

```

## getUser

The _getUser()_ function is used by the client application to get information about the currently logged in user to CosyncAuth. The _getUser()_ function will resovle user data. These member variables include the following information:

- **handle** : String - email handle of user
- **twoFactorPhoneVerification** : Bool - whether phone 2FA is enabled for user
- **twoFactorGoogleVerification** : Bool - whether google 2FA is enabled for user
- **appId** : String - CosyncAuth app Id for user
- **phone** : String - phone number for user in E. 164 format
- **phoneVerified** : Bool - whether user phone number has been verified
- **metadata** : String - JSON string of user metadata
- **lastLogin** : Date - last login date for user

```
getUser(){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

### Parameters

None

### Example

```
cosync.profile.getUser().then(result => {
	// result here...
}).catch(err => {
	// invalid result here...
	// code, message
})

```

## getApplication

The _getApplication()_ function is used by the client application to get information about the application within CosyncAuth. The _getApplication()_ function will resolve application information. These member variables include the following information:

- **name** : String - application name as stored in CosyncAuth
- **twoFactorVerification** : String - 2FA type 'phone', 'google', or 'none'
- **passwordFilter** : Bool - whether password filtering is turned on
- **passwordMinLength** : Int - minimum password length
- **passwordMinUpper** : Int - minimum number of upper case characters
- **passwordMinLower** : Int - minimum number of lower case characters
- **passwordMinDigit** : Int - minimum number of digits
- **passwordMinSpecial** : Int - minimum number of special characters
- **appData** : Object - installed verson of Cosync Service 
- **invitationEnabled** : Bool - app alow invitation
- **signupEnabled** : Bool - app alow signup
- **signupFlow** : String - signup flow can be 'code', 'link', or 'none'
- **metaData** : Object - Metadata format of app user
- **metaDataInvite** : Object - Metadata format of app invitation
- **userJWTExpiration** : Bool - JWT expired time
- **anonymousLoginEnabled** : Bool - allow anonumous user to login
- **userNamesEnabled** : Bool - allow username to login
- **appleLoginEnabled** : Bool - enable Apple Login button
- **googleLoginEnabled** : Bool - enable Google Login button
- **locales** : Array of string - locales code
```
getApplication(){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

### Parameters

None

### Example

```
cosync.app.getApplication().then(result => {
	// result here...
}).catch(err => {	
	// invalid result here...
	// code, message
})

```

## setPhone

The _setPhone()_ function is used by the client application to set the user's phone number, if **twoFactorVerification** for the application is set to `phone`. The phone number should be in E.164 format, and can include the prefix '+', e.g. "+19195551212". When a phone number is set, it will be initially considered unverified. After calling the _setPhone()_ function, the CosyncAuth system will send a six digit code SMS to the phone for verification. The application will then have to call the _verifyPhone()_ along with the six-digit code to verify the phone on behalf of the user.

```
setPhone(phoneNumber){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

### Parameters

**phoneNumber** : String - contains the user's phone number in E.164 format

### Example

```
cosync.profile.setPhone(phoneNumber).then(result => {
	// result here...

}).catch(err => {
	// invalid result here...
	// code, message
})

```

## verifyPhone

The _verifyPhone()_ function is used by the client application to verify a user's phone number, after a call to the _setPhone()_ function. The _verifyPhone()_ must passed a six-digit code that was sent to the user's phone.

```
verifyPhone(code){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

### Parameters

**code** : String - six-digit code that was sent to user's phone

### Example

```
cosync.profile.verifyPhone(code).then(result => {
	// result here...

}).catch(err => {
    // invalid result here...
	// code, message
})


```

## setTwoFactorPhoneVerification

The _setTwoFactorPhoneVerification()_ function is used by the client application to enable two factor phone verification for the current logged in user. This function will only enable phone 2FA is the CosyncAuth application has **twoFactorVerification** set to `phone` and the user has a verified phone number.

```
setTwoFactorPhoneVerification(twoFactor){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

### Parameters

**twoFactor** : Bool - _true_ to enable phone 2FA for the user, _false_ to disable it

### Example

```
cosync.profile.setTwoFactorPhoneVerification(true).then(result => {
	// result here...

}).catch(err => {
	// invalid result here...
	// code, message

})

```

## setTwoFactorGoogleVerification

The _setTwoFactorGoogleVerification()_ function is used by the client application to enable two factor phone verification for the current logged in user. This function will only enable google 2FA is the CosyncAuth application has **twoFactorVerification** set to `google`. After calling this function, the user will be sent an email with a bar code for the Google Authenticator application.

Note: The Google 2FA authentication system is more secure than simple phone 2FA, because the Google codes rotate every minute. Also, the Google 2FA authentication is free is does not require a TWILIO account for SMS phone verification.

```
setTwoFactorGoogleVerification(twoFactor){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

### Parameters

**twoFactor** : Bool - _true_ to enable Google 2FA for the user, _false_ to disable it

### Example

```
cosync.profile.setTwoFactorGoogleVerification(true).then(result => {
	// result here...

}).catch(err => {
	// invalid result here...
	// code, message

})

```

## forgotPassword

The _forgotPassword()_ function is used by the client application to enable a user to reset the password for their account. After calling this function, the user will be sent a reset password email along with a six-digit code to reset their password. The password is reset by calling the _resetPassword()_ function. The user does not need to be logged in for this function to work.

```
forgotPassword(handle){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

### Parameters

**handle** : String - email handle of the user to reset password for

### Example

```
cosync.password.forgotPassword(handle).then(result => {
	// result here...

}).catch(err => {
	// invalid result here...
	// code, message

})


```

## resetPassword

The _resetPassword()_ function is used by the client application to reset the password for their account after issuing a _forgotPassword()_ function call. The user does not need to be logged in for this function to work.

```
resetPassword(handle, password, code){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

### Parameters

**handle** : String - email handle of the user to reset password for
**password** : String - new password for the account. The password must be md5 string.
**code** : String - code that was emailed the user by the _forgotPassword()_ function

### Example

```
cosync.password.resetPassword(handle, password, code).then(result => {
	// result here...

}).catch(err => {
	// invalid result here...
	// code, message

})


```

## changePassword

The _changePassword()_ function is used by the client application to change the password of the current logged in user. The user must be logged in for this function to work.

```
changePassword(newPassword, password){
	return new Promise((resolve, reject) => {
		resolve(result) or reject(err)
	})
}
```

### Parameters

**newPassword** : String - new password for the account.
**password** : String - old password for the account.

### Example

```
cosync.password.changePassword(newPassword, password).then(result => {
	// result here...

}).catch(err => {
	// invalid result here...
	// code, message

})



```


## checkPassword

The *checkPassword()* function is used by the client application to check whether a password conforms to the *password filtering* parameters set for the application in the Cosync Portal. When using CosyncAuth, a developer can require that user for an application meet specific password requirements, which include:

* minimum length
* minimum upper-case letters
* minimum lower-case letters
* minimum number of digits (0…9)
* minimum special characters

The special characters include @, %, +, , /, ‘, !, #, $, ^, ?, :, (, ), [, ], ~, `, -, _, ., and ,

The *password filtering* parameters are set by the developer in the Cosync Portal, but actual password enforcement takes place at the client side. The reason for this is that passwords are sent to the CosyncAuth service as MD5 hashed strings, so there is no way to enforce this at the server level. This function is automatically called by the *signup()* function, so does not need to be called by the application code.

```
checkPassword(password){
	return new Promise((resolve, reject) => {
		resolve(result)
	})

}
```

### Parameters

**password** : String - this contains the user's password.

### Example

```
cosync.password.checkPassword(password).then(result => {
	// result is true or flase
})

```



## logout

The *logout()* function is used by the client application to logout current logged in user. The function also logout user from MongodBD Realm.



```
logout(){
}
```

### Parameters

None

### Example

```
cosync.logout();

```
