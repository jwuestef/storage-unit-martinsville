export class Image {
    $key: string;
    file: File;
    description: string;
    url: string;
    link: string;
    progress: number;
    constructor(file: File) {
        this.file = file;
    }
}
