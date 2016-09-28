import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ReceiptComponent } from "./receipt/receipt.component";
import { ReceiptSelectorComponent } from "./receipt-selector/receipt-selector.component"
import { AboutComponent } from "./about/about.component";
import { ReceiptEditorComponent } from "./receipt-editor/receipt-editor.component";


const appRoute:Routes = [
    {
        path:'',
        redirectTo:'/home',
        pathMatch:'full' //redirect to /home no matter where this router is
    },
    {
        path:'home',
        component:ReceiptSelectorComponent
    },
    {
        path:'receipt/:id',
        component:ReceiptComponent
    },
    {
        path:'about',
        component:AboutComponent
    },
    {
        path:'editor/:id',
        component:ReceiptEditorComponent
    }
    /*
    {
        path:'receipt',
        component:ReceiptComponent
    }
    */
    
]

//export the routing to module
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoute)