let center = [75.4022, 28.1317];
const map = tt.map({
    key: mapToken,
    container: "map",
    center: center,
    zoom: 10,
});
map.on("load", () => {
    new tt.Marker().setLngLat(center).addTo(map);
});
