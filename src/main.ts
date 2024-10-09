import { UserService } from "./user.service";
// calling the fetchUsers function on btn click
const btn = document.getElementById("btn");
const saveBtn = document.getElementById("save");
const output = document.getElementById("data") as HTMLPreElement;

const fetchUsers =  () => {
const userID:number = +(( document.getElementById("userID") as HTMLInputElement).value);

  if(userID){
    UserService.getUserById(userID).subscribe((data) => {
      console.log(data)
      output.innerHTML = JSON.stringify(data, null, 4);
    });
  }
 
}

const saveData = () => {
const userID:number = +(( document.getElementById("userID") as HTMLInputElement).value);
const userDataEdited = JSON.parse((document.getElementById("data") as HTMLPreElement).innerHTML)
  if(userID){
    UserService.saveUser(userID, userDataEdited).subscribe((data) => {
      console.log(data)
      output.innerHTML = JSON.stringify(data, null, 4);
    });
  }
}

btn?.addEventListener("click", fetchUsers);
saveBtn?.addEventListener("click", saveData);
