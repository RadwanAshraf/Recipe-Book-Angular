/*export class Recipe {
  public name!: string;
  public description!: string;
  public imgPath!: string;

  public constractor(public name: string, desc: string, imgPath: string) {
    this.name = name;
    this.description = desc;
    this.imgPath = imgPath;
  }
}
*/

export class Recipe {
  constructor(public name: string, public description: string, public imagePath: string) {}
}