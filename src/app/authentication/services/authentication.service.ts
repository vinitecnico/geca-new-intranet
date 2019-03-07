import { Injectable, Inject, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    constructor(private router: Router,
        @Inject('LocalStorage') localStorage) {
    }

    login(authData: {username: string, password: string}) {
        // this.itemsCollection = this.db.collection('user', ref =>
        //     ref.where('username', '==', authData.username)
        //         .where('password', '==', authData.password));
        // return this.itemsCollection.snapshotChanges()
        //     .pipe(
        //         map(actions =>
        //             actions.map(a => {
        //                 const data = a.payload.doc.data() as any;
        //                 data.id = a.payload.doc.id;
        //                 return data;
        //             })
        //         )
        //     );
    }

    checkLocalData() {
        const auth = localStorage.getItem('authData');
        const client = localStorage.getItem('clientData');

        if (auth) {
            localStorage.removeItem('authData');
        }

        if (client) {
            localStorage.removeItem('clientData');
        }
    }
}
