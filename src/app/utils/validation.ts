import { AutocompleteDropdown } from "../entities/autocomplete-dropdown";

export class Validation {
    public static validateRequired(required: any){
        let valid = true;
    
        required.forEach((req: any) => {
          if(req instanceof AutocompleteDropdown){
            if(!req.required()){
              valid = false;
            }
          }else{
            if(!req){
              valid = false;
            }
          }
        });
        return valid;
      }
 }