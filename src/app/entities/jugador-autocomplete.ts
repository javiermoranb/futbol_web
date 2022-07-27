import { AutocompleteDropdown } from "./autocomplete-dropdown";
import { JugadorService } from "../services/jugador.service";

export class JugadorAutocomplete extends AutocompleteDropdown{

    constructor() {
      super();
    }

    filter(jugadorService: JugadorService, event: any) {
      let query = event.query;
      jugadorService.getJugador(query).then(list => {
        this.filteredList = list;
      });
    }
}
  