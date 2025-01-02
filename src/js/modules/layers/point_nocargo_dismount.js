import commonLayerSettings from "./commonLayerSettings.js";

const iconImage = [
  "step", ["zoom"],
  "reddot",
  commonLayerSettings.minZoomForIcons, "nocargo_dismount"
];

const getNoCargoDismountPointLayerFor = function (sourceName) {
  return [
    {
      "id": "nocargo_dismount" + sourceName,
      "type": "symbol",
      "source": sourceName,
      "filter": ["all", ["==", "dismount", "yes"],["==", "nocargo", "yes"]],
      'layout': {
        'icon-image': iconImage,
        'icon-size': commonLayerSettings.iconSize,
        'icon-overlap': 'always'
      }
    },
  ];
}

export default getNoCargoDismountPointLayerFor;
