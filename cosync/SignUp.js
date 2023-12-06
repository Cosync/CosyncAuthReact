
//
//  SignUp.js
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

module.exports = class SignUp {

    /**
     * 
     * @param {*} httpService 
     */
    constructor(httpService) {
        this.httpService = httpService;
    } 

    /**
     * 
     * @param {*} userEmail 
     * @param {*} userPassword 
     * @param {*} metadata 
     * @param {*} locale 
     * @returns 
     */
    signup(userEmail, userPassword, metadata, locale){
        return new Promise((resolve, reject) => {  
            let dataToSend = {
                handle: userEmail,
                password: md5(userPassword),
                locale: locale
            }; 
            
            if(metadata) dataToSend.metaData = JSON.stringify(metadata);
            
            this.httpService.post('/api/appuser/signup', dataToSend).then(result => {
                if(result['access-token']) global.cosyncConfig.accessToken = result['access-token'];
                resolve(result);
            }).catch((error) => reject(error)); 
        })
    }

    /**
     * 
     * @param {*} userEmail 
     * @param {*} signupCode 
     */
    completeSignup(userEmail, signupCode) {
        return new Promise((resolve, reject) => {  
            let dataToSend = {
                handle: userEmail,
                code: signupCode 
            }; 

            this.httpService.post('/api/appuser/completeSignup', dataToSend).then(result => {

                if(result && result.jwt){
                    if(result['access-token']) global.cosyncConfig.accessToken = result['access-token'];
                    resolve(result);
                } 
                else reject(result);

            }).catch((error) => reject(error)); 
        });
    }


    /**
     * 
     * @param {*} token 
     * @param {*} provider 
     * @returns 
     */

    socialLogin(token, provider){
        return new Promise((resolve, reject) => {  
            let dataToSend = {
                token: token,
                provider: provider 
            }; 

            this.httpService.post('/api/appuser/socialLogin', dataToSend).then(result => {

                if(result && result.jwt){
                    if(result['access-token']) global.cosyncConfig.accessToken = result['access-token'];
                    resolve(result);
                } 
                else reject(result);

            }).catch((error) => reject(error)); 
        });
    }
 

}
 