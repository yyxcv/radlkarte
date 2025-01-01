const iconSize = [
  "interpolate", ["linear"], ["zoom"],
  9, 0.02,
  20, 0.08
];

const getWarningPointLayerFor = function (sourceName) {
  return [
    {
      "id": "warning" + sourceName,
      "type": "symbol",
      "source": sourceName,
      "filter": ["all", ["==", "warning", "yes"]],
      'layout': {
        'icon-image': 'warning',
        'icon-size': iconSize,
        'icon-overlap': 'always'
      }
    },
  ];
}

export default getWarningPointLayerFor;
