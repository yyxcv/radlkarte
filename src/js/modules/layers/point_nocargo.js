const iconSize = [
  "interpolate", ["linear"], ["zoom"],
  9, 0.02,
  20, 0.08
];

const getNoCargoPointLayerFor = function (sourceName) {
  return [
    {
      "id": "nocargo" + sourceName,
      "type": "symbol",
      "source": sourceName,
      "filter": ["all", ["==", "nocargo", "yes"],["!=", "dismount", "yes"]],
      'layout': {
        'icon-image': 'nocargo',
        'icon-size': iconSize,
        'icon-overlap': 'always'
      }
    },
  ];
}

export default getNoCargoPointLayerFor;
