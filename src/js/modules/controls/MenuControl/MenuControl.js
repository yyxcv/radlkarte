import "./style.scss";
import template from "./templates/template.js";

export default class MenuControl {

  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group menu-control';
    this._container.innerHTML = template;

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
