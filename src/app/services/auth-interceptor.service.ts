import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable} from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{    
    intercept(request: HttpRequest<any> , next: HttpHandler ): Observable<HttpEvent<any>>{        
       let token= localStorage.getItem('access_token');
      
       if(token){
        request = request.clone({             
                headers: new HttpHeaders({  
                   'Content-Type': 'application/json',                  
                    "Authorization" : 'Bearer ' + token,                  
                  })
        });      
    }
    return next.handle(request);    
    }

}