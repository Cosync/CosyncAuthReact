


//
//  Profile.js
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

module.exports = class Profile { 


    /**
     * 
     * @param {*} httpService 
     */
    constructor(httpService) {
        this.httpService = httpService;
    } 

    /**
     * 
     * @returns 
     */
    getUser(){
        return new Promise((resolve, reject) => {  
            
            this.httpService.fetchData('/api/appuser/getUser').then(result => { 
                resolve(result);
            }); 
        })
    }

    /**
     * 
     * @param {*} handle 
     * @param {*} metadata 
     * @param {*} senderUserId 
     * @returns 
     */
    invite(handle, metadata, senderUserId){
        return new Promise((resolve, reject) => { 

            if(!global.realmUser){
                reject({message:"invalid realm user id"});
                return;
            }

            let dataToSend = {
                handle: handle, 
                senderUserId: senderUserId || global.realmUser.id
            };

            if(metadata) dataToSend.metaData = JSON.stringify(metadata);

            this.httpService.post('/api/appuser/invite', dataToSend).then(result => { 
                if(result == true) resolve(result);
                else reject(result);
            }).catch((error) => reject(error)); 
        })
    }


    /**
     * 
     * @param {*} code 
     * @returns 
     */
    verifyPhone(code){
        return new Promise((resolve, reject) => {  
            
            let dataToSend = {
                code: code 
            };

            this.httpService.post('/api/appuser/verifyPhone', dataToSend).then(result => { 
                if(result == true) resolve(result);
                else reject(result);
            }).catch((error) => reject(error)); 
        })
    }

     /**
     * 
     * @param {*} code 
     * @returns 
     */
     setLocale(localeCode){
        return new Promise((resolve, reject) => {  
            
            let dataToSend = {
                locale: localeCode 
            };

            this.httpService.post('/api/appuser/setLocale', dataToSend).then(result => { 
                if(result == true) resolve(result);
                else reject(result);
            }).catch((error) => reject(error)); 
        })
    }


    /**
     * 
     * @param {*} phone 
     * @returns true 
     */
    setPhone(phone){
        return new Promise((resolve, reject) => {  
            
            let dataToSend = {
                phone: phone 
            };

            this.httpService.post('/api/appuser/setPhone', dataToSend).then(result => { 
                if(result == true) resolve(result);
                else reject(result);
            }).catch((error) => reject(error)); 
        })
    }


    /**
     * 
     * @param {*} metadata 
     * @returns true 
     */
     setUserMetadata(metadata){
        return new Promise((resolve, reject) => {  
            
            let dataToSend = {
                metaData: JSON.stringify(metadata) 
            };

            this.httpService.post('/api/appuser/setUserMetadata', dataToSend).then(result => { 
                if(result == true) resolve(result);
                else reject(result);
            }).catch((error) => reject(error)); 
        })
    }



    /**
     * 
     * @param {boolean} value 
     * @returns  
     */
    setTwoFactorGoogleVerification(value){
        return new Promise((resolve, reject) => {  
            
            let dataToSend = {
                twoFactor: value 
            };

            this.httpService.post('/api/appuser/setTwoFactorGoogleVerification', dataToSend).then(result => { 
                if(result == true || result.googleSecretKey) resolve(result);
                else reject(result);
            }).catch((error) => reject(error)); 
        })
    }

    
 

}
 
       