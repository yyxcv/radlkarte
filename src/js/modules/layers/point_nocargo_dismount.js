const iconSize = [
  "interpolate", ["linear"], ["zoom"],
  9, 0.02,
  20, 0.08
];

const iconImage = [
  "step", ["zoom"],
  "reddot",
  12, "nocargo_dismount"
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
        'icon-size': iconSize,
        'icon-overlap': 'always'
      }
    },
  ];
}

export default getNoCargoDismountPointLayerFor;
