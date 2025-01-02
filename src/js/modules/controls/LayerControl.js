

const controlInnerHtml = `
    <button>
         <img src="/image/layers-2x.png" alt="Ebenen Symbol">
    </button>
   
    <div>
    
    <fieldset style="display: flex; flex-direction: column;">
        <label>
            <input type="radio" name="background_layer" value="carto" checked>
            <span>Straßenkarte</span>
        </label>
         <label>
            <input type="radio" name="background_layer" value="areal_view">
            <span>Luftbild</span>
        </label>
        <label>
            <input type="radio" name="background_layer" value="cycl_osm">
            <span>CyclOSM</span>
        </label>
        <label>
            <input type="radio" name="background_layer" value="open_cycle_map">
            <span>Open Cycle Map</span>
        </label>
         <label>
            <input type="radio" name="background_layer" value="white">
            <span>Weiß</span>
        </label>
    </fieldset>
        <fieldset style="display: flex; flex-direction: column;">
        <label>
            <input type="checkbox" name="background_layer" value="problems" checked>
            <span>Problemstellen</span>
        </label>
         <label>
            <input type="checkbox" name="background_layer" value="rental_bikes">
            <span>Leihräder</span>
        </label>
        <label>
            <input type="checkbox" name="background_layer" value="public_transport">
            <span>Öffentlicher Verkehr</span>
        </label>
        <label>
            <input type="checkbox" name="background_layer" value="bike_shops">
            <span>Fahrradgeschäfte</span>
        </label>
         <label>
            <input type="checkbox" name="background_layer" value="repair_stations">
            <span>Reparaturstationen</span>
        </label>
         <label>
            <input type="checkbox" name="background_layer" value="pumps">
            <span>Luftpumpen</span>
        </label>
        <label>
            <input type="checkbox" name="background_layer" value="spare_tubes">
            <span>Schlauchomaten</span>
        </label> 
         <label>
            <input type="checkbox" name="background_layer" value="drinking_water">
            <span>Trinkwasser</span>
        </label>
    </fieldset>
    </div>
`;




export default class LayerControl {

  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
    this._container.innerHTML = controlInnerHtml;

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
