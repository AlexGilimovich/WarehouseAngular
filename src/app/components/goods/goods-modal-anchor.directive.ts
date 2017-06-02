import {ComponentFactoryResolver, ComponentRef, Directive, Type, ViewContainerRef} from '@angular/core';
import {GoodsCreateComponent} from "./goods-create/goods-create.component";
import {GoodsChoiceComponent} from "./goods-choice/goods-choice.component";

@Directive({
  selector: '[appGoodsModalAnchor]'
})
export class GoodsModalAnchorDirective {

  constructor(private viewContainer: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  createGoods(): ComponentRef<GoodsCreateComponent> {
    this.viewContainer.clear();

    const dialogComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(GoodsCreateComponent);
    return this.viewContainer.createComponent(dialogComponentFactory);
  }

  chooseGoods(): ComponentRef<GoodsChoiceComponent> {
    this.viewContainer.clear();

    const dialogComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(GoodsChoiceComponent);
    return this.viewContainer.createComponent(dialogComponentFactory);
  }
}
