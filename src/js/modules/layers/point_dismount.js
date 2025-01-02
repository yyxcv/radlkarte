import commonLayerSettings from "./commonLayerSettings.js";


const iconImage = [
  "step", ["zoom"],
  "reddot",
  commonLayerSettings.minZoomForIcons, "dismount"
];


const getDismountPointLayerFor = function (sourceName) {
  return [
    {
      "id": "dismount" + sourceName,
      "type": "symbol",
      "source": sourceName,
      "filter": ["all", ["==", "dismount", "yes"], ["!=", "nocargo", "yes"]],
      'layout': {
        'icon-image': iconImage,
        'icon-size': commonLayerSettings.iconSize,
        'icon-overlap': 'always'
      }
    },
  ];
}

export default getDismountPointLayerFor;
