import commonLayerSettings from "./commonLayerSettings.js";

const iconImage = [
  "step", ["zoom"],
  "reddot",
  commonLayerSettings.minZoomForIcons, "warning"
];

const getWarningPointLayerFor = function (sourceName) {
  return [
    {
      "id": "warning" + sourceName,
      "type": "symbol",
      "source": sourceName,
      "filter": ["all", ["==", "warning", "yes"]],
      'layout': {
        'icon-image': iconImage,
        'icon-size': commonLayerSettings.iconSize,
        'icon-overlap': 'always'
      }
    },
  ];
}

export default getWarningPointLayerFor;
