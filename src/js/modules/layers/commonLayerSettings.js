const commonLayerSettings = {
  minZoomForPriority1: 12,
  minZoomForPriority2: 13,
  minZoomForIcons: 13,
  iconSize: [
    "interpolate", ["linear"], ["zoom"],
    9, 0.025,
    20, 0.07
  ],
  lineColors: [
    "match", ["get", "stress"],
    "0", "#004B67",
    "1", "#51A4B6",
    "2", "#FF6600",
    "#000"
  ],
};

export default commonLayerSettings;
