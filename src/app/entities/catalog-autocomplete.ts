import { AutocompleteDropdown } from "./autocomplete-dropdown";
import { CatalogService } from "../services/catalog.service";

export class CatalogAutocomplete extends AutocompleteDropdown{
    table!: string;
    orderBy!: string;

    constructor( table:string, orderBy: string) {
      super();
      this.table = table;
      this.orderBy = orderBy
    }

    filter(catalogService: CatalogService, event: any) {
      let query = event.query;
      catalogService.getCatalog(this.table, query, this.orderBy).then(list => {
        this.filteredList = list;
      });
    }
}
  