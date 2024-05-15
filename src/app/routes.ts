import {Routes} from '@angular/router';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { LoginForm } from './login-form.component';

const routeConfig: Routes =[
    {
        path: '',
        component: AnimalFormComponent,
        title: 'Overview'
    },
    {
        path: 'login',
        component: LoginForm,
        title: 'Login'
    },
/*     {
        path: 'admin',
        component: AdminComponent,
        title: 'Admin Interface'
    } */
];

export default routeConfig;
