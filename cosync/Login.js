


//
//  Login.js
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
import md5 from 'md5';

module.exports = class Login {

    /**
     * 
     * @param {*} httpService 
     */
    constructor(httpService) {
        this.httpService = httpService;
    } 
    /**
     * 
     * @param {*} userHandle :start with ANON_ 
     * @returns 
     */
     loginAnonymous(userHandle){
        return new Promise((resolve, reject) => {

            if(userHandle.indexOf("ANON_") < 0){
                let error = {
                    code: 600,
                    message: "invalid anonymous handle. Please start with ANON_[uuid]"
                }
                reject(error); 
                return
            }

            let dataToSend = {
                handle: userHandle
            }; 
            
            this.httpService.post('/api/appuser/loginAnonymous', dataToSend).then(result => {
                if(result.code) reject(result);
                else{
                    if(result['access-token']) global.cosyncConfig.accessToken = result['access-token'];
                    resolve(result);
                } 
            }).catch((error) => reject(error)); 
        })
    }


    /**
     * 
     * @param {*} userEmail 
     * @param {*} userPassword 
     * @returns 
     */
    login(userEmail, userPassword){
        return new Promise((resolve, reject) => {

            let dataToSend = {
                handle: userEmail,
                password: md5(userPassword)
            }; 
            
            this.httpService.post('/api/appuser/login', dataToSend).then(result => {
                if(result.code) reject(result);
                else{
                    if(result['access-token']) global.cosyncConfig.accessToken = result['access-token'];
                    resolve(result);
                } 
            }).catch((error) => reject(error)); 
        })
    }


    /**
     * 
     * @param {*} loginToken 
     * @param {*} loginCode 
     * @returns 
     */
    loginComplete(loginToken, loginCode) {
        return new Promise((resolve, reject) => {  
            let dataToSend = {
                loginToken: loginToken,
                code: loginCode
            }; 

            this.httpService.post('/api/appuser/loginComplete', dataToSend).then(result => {
                if(result && result.jwt){ 
                    if(result['access-token']) global.cosyncConfig.accessToken = result['access-token'];
                    resolve(result);
                } 
                else reject(result);

            }).catch((error) => reject(error)); 
        }); 
    }
 

}
 
       