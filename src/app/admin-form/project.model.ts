/**
 * Created by Rami Khadder on 7/24/2017.
 */
export class Project{
  id: number;
  name: string;
  checked: boolean = false;

  constructor(id: number, name: string){
    this.id = id;
    this.name = name;
  }

  setChecked(isChecked) {
    this.checked = isChecked;
  }
}
