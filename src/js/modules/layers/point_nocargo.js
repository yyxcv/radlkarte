import commonLayerSettings from "./commonLayerSettings.js";

const iconSize = [
  "interpolate", ["linear"], ["zoom"],
  9, 0.02,
  20, 0.08
];

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
        'icon-size': iconSize,
        'icon-overlap': 'always'
      }
    },
  ];
}

export default getNoCargoPointLayerFor;
