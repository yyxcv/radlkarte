import commonLayerSettings from "./commonLayerSettings.js";

const iconImage = [
  "step", ["zoom"],
  "reddot",
  commonLayerSettings.minZoomForIcons, "nocargo"
];

const getNoCargoPointLayerFor = function (sourceName) {
  return [
    {
      "id": "nocargo" + sourceName,
      "type": "symbol",
      "source": sourceName,
      "filter": ["all", ["==", "nocargo", "yes"],["!=", "dismount", "yes"]],
      'layout': {
        'icon-image': iconImage,
        'icon-size': commonLayerSettings.iconSize,
        'icon-overlap': 'always'
      }
    },
  ];
}

export default getNoCargoPointLayerFor;
