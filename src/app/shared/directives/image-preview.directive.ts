import { Directive, ElementRef, Input, Renderer, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'img[imagePreview]'
})
export class ImagePreviewDirective implements OnChanges {

  @Input() image: any;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnChanges(changes: SimpleChanges) {

    const reader = new FileReader();
    const el = this.el;

    reader.onloadend = (e) => {
      el.nativeElement.src = reader.result;
    };

    if (this.image) {
      return reader.readAsDataURL(this.image);
    }

  }

}
