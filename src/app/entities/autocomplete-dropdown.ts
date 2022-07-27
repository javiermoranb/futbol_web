export class AutocompleteDropdown {

    list!: any;
    filteredList!: any;
    selected!: any;
    errors!: { [error: string]: string };

    constructor() {
        this.errors = {};
    }

    required(){
        if(!this.selected){
            this.errors['required'] = 'Campo obligatorio'
        }else if(this.errors['required']){
            delete this.errors['required'];
        }

        return this.selected
    }
}


