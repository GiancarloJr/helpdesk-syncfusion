import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { registerLicense } from '@syncfusion/ej2-base';


registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cWmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZjUX9dcnRVR2JaUkN+XA==');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
