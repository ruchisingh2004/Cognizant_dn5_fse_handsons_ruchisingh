import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { loggingInterceptor } from './interceptors/logging-interceptor';

import { courseReducer } from './store/course/course.reducer';
import { CourseEffects } from './store/course/course.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(
      withFetch(),
      withInterceptors([loggingInterceptor])
    ),

    // NgRx Store
    provideStore({
      courses: courseReducer
    }),

    // NgRx Effects
    provideEffects([
      CourseEffects
    ]),

    // Redux DevTools
    provideStoreDevtools({
      maxAge: 25
    })
  ]
};