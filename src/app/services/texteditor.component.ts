import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';



@Component({
  selector: 'texteditor',
  template: `<textarea id="{{elementId}}"></textarea>`
})
export class TexteditorComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;



  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      branding: false,
      menubar: false,
      resize: 'both',
      height: 200,
      browser_spellcheck: true,
      elementpath: false,
      relative_urls: false,
      paste_data_images: false,
      toolbar: [
        'undo redo | cut copy paste | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | indent outdent',
        'fontsizeselect textcolor forecolor colorpicker | subscript superscript | bullist numlist table link image media preview'
      ],
      fontsize_formats: '6pt 8pt 10pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 28pt 30pt 32pt 34pt 36pt 38pt 40pt 42pt 44pt 46pt 48pt',
      plugins: ['link lists preview textcolor image media paste colorpicker table'],
      skin_url: 'assets/skins/lightgray',
      style_formats_merge: true,
      theme: 'modern',
      textcolor_map: [
        'bcb1ac', 'Light Brown',
        '785c44', 'Medium Brown',
        '4E2E28', 'Dark Brown',
        '4f3727', 'Super Dark Brown',
        '000000', 'Black',
        '993300', 'Burnt Orange',
        '333300', 'Dark Olive',
        '003300', 'Dark Green',
        '003366', 'Dark Azure',
        '000080', 'Navy Blue',
        '333399', 'Indigo',
        '333333', 'Very Dark Gray',
        '800000', 'Maroon',
        'FF6600', 'Orange',
        '808000', 'Olive',
        '008000', 'Green',
        '008080', 'Teal',
        '0000FF', 'Blue',
        '666699', 'Grayish Blue',
        '808080', 'Gray',
        'FF0000', 'Red',
        'FF9900', 'Amber',
        '99CC00', 'Yellow Green',
        '339966', 'Sea Green',
        '33CCCC', 'Turquoise',
        '3366FF', 'Royal Blue',
        '800080', 'Purple',
        '999999', 'Medium Gray',
        'FF00FF', 'Magenta',
        'FFCC00', 'Gold',
        'FFFF00', 'Yellow',
        '00FF00', 'Lime',
        '00FFFF', 'Aqua',
        '00CCFF', 'Sky Blue',
        '993366', 'Red Violet',
        'FFFFFF', 'White',
        'FF99CC', 'Pink',
        'FFCC99', 'Peach',
        'FFFF99', 'Light Yellow',
        'CCFFCC', 'Pale Green',
        'CCFFFF', 'Pale Cyan',
        '99CCFF', 'Light Sky Blue',
        'CC99FF', 'Plum'
      ],
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }



  ngOnDestroy() {
    tinymce.remove(this.editor);
  }



}
