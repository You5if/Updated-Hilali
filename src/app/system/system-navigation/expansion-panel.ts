import { Directive, ElementRef, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appCustomMatExpansionToggle]'
})
export class CustomMatExpansionToggleDirective implements AfterViewInit, OnDestroy {
  private elem: HTMLSpanElement;
  private uns: Subscription;
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    this.elem = this.elRef.nativeElement.querySelector(".indicator");

    this.uns = fromEvent(this.elem, 'animationend').subscribe(() => {
      this.elem.classList.remove("rotate");
      this.elem.classList.remove("reverse");
    });
  }

  @HostListener("opened")
  onOpen() {
      this.elem.classList.remove("reverse");
    this.elem.classList.add("rotate");
  }

  @HostListener("closed")
  onClose() {
    this.elem.classList.remove("rotate");
    this.elem.classList.add("reverse");
  }

  ngOnDestroy() {
    this.uns.unsubscribe();
  }
}


@Directive({
  selector: '[appCustomMatExpansionToggle2]'
})
export class CustomMatExpansionToggleDirective2 implements AfterViewInit, OnDestroy {
  private elem: HTMLSpanElement;
  private uns: Subscription;
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    this.elem = this.elRef.nativeElement.querySelector(".indicator2");

    this.uns = fromEvent(this.elem, 'animationend').subscribe(() => {
      this.elem.classList.remove("rotate");
      this.elem.classList.remove("reverse");
    });
  }

  @HostListener("opened")
  onOpen() {
      this.elem.classList.remove("reverse");
    this.elem.classList.add("rotate");
  }

  @HostListener("closed")
  onClose() {
    this.elem.classList.remove("rotate");
    this.elem.classList.add("reverse");
  }

  ngOnDestroy() {
    this.uns.unsubscribe();
  }
}