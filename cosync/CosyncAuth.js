
//  CosyncAuth.js 
//  
//  CosyncAuth
//
//  Licensed to the Apache Software Foundation (ASF) under one
//  or more contributor license agreements.  See the NOTICE file
//  distributed with this work for additional information
//  regarding copyright ownership.  The ASF licenses this file
//  to you under the Apache License, Version 2.0 (the
//  "License"); you may not use this file except in compliance
//  with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing,
//  software distributed under the License is distributed on an
//  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
//  KIND, either express or implied.  See the License for the
//  specific language governing permissions and limitations
//  under the License.
//
//  Created by Tola Voeung.
//  Copyright © 2023 cosync. All rights reserved.
// 

'use strict';
const App = require('./App'); 
const Profile = require("./Profile"); 
const Login = require("./Login");
const SignUp = require("./SignUp");
const Password = require("./Password");
const Register = require("./Register");
const HttpService = require("./utils/HttpService"); 
const RealmManager = require("./utils/RealmManager");

let _profile, _app, _login, _signup, _pasword, _config, _register, _realm;

class CosyncAuth {

    /**
     * 
     * @param {*} data 
     * {
     *  apiUrl, accessToken, appToken
     * }
     */
    constructor(data) {
        this.config = data;
    } 

    /**
     * 
     */

    get realmManager(){
        _realm = new RealmManager();
        return _realm;
    }

    /**
     * 
     * @param {*} data
     * {
     *  apiUrl, accessToken, appToken
     * }
     */
    set config(data){ 
       
        if(!data.apiUrl || data.apiUrl == '' ) data.apiUrl = 'https://sandbox.cosync.net';
         
        _config = data;

        this.httpService = new HttpService(data);

        _pasword = new Password(this.httpService);
        _app = new App(this.httpService);
        _profile = new Profile(this.httpService);
        _login = new Login(this.httpService);
        _signup = new SignUp(this.httpService);
        _register = new Register(this.httpService);
    }

    get config () {
        return _config;
    }


    /**
     * 
     * @returns app class
     */
    get app(){
       return _app;
    }

 
    /**
     * 
     * @returns profile class
     */
    get profile(){
       return _profile;
    }

    /**
     * 
     * @returns login class
     */
    get login(){
        return _login
    }

    /**
     * 
     * @returns signup class
     */
    get signup() {
        return _signup;
    }


    /**
     * 
     * @returns register class
     */
     get register(){
        return _register;
    }

    /**
     * 
     * @returns pasword class
     */
    get password(){
        return _pasword;
    }

    logout(){
        global.cosyncConfig.accessToken = null;
        global.realmUser = null;
        if(this._realm) this._realm.logout();
    }

}
  

class Singleton {

    constructor(data) {
        if (!Singleton.instance) {
            Singleton.instance = new CosyncAuth(data);
        }
    }
  
    getInstance() {
        return Singleton.instance;
    }
  
}
 
module.exports = Singleton;