import { Directive, OnInit, OnDestroy, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SecurityService } from '../services/security.service';

@Directive({
  selector: '[roleCanAccess]'
})
export class CanAccessDirective implements OnInit, OnDestroy{

  @Input('roleCanAccess') roleCanAccess: string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private securityService: SecurityService
  ) {
  }

  ngOnInit(): void {
    this.applyPermission();
  }

  ngOnDestroy(): void {

  }

  private applyPermission(): void {  
    if(this.roleCanAccess){
      this.viewContainer.clear();
      if(this.securityService.hasPermisions(this.roleCanAccess)){
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }else{
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
