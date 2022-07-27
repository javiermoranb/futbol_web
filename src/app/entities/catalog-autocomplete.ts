import { AutocompleteDropdown } from "./autocomplete-dropdown";
import { CatalogService } from "../services/catalog.service";

export class CatalogAutocomplete extends AutocompleteDropdown{
    table!: string;

    constructor( table:string) {
      super();
      this.table = table;
    }

    filter(catalogService: CatalogService, event: any) {
      let query = event.query;
      catalogService.getCatalog(this.table, query).then(list => {
        this.filteredList = list;
      });
    }
}
  