const iconSize = [
  "interpolate", ["linear"], ["zoom"],
  9, 0.02,
  20, 0.08
];

const getDismountPointLayerFor = function (sourceName) {
  return [
    {
      "id": "dismount" + sourceName,
      "type": "symbol",
      "source": sourceName,
      "filter": ["all", ["==", "dismount", "yes"]],
      'layout': {
        'icon-image': 'dismount',
        'icon-size': iconSize,
        'icon-overlap': 'always'
      }
    },
  ];
}

export default getDismountPointLayerFor;
