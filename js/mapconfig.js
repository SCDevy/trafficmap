$(function() {
    var map = L.mapbox.map('map', 'syhchen2012.i119hfgd', { zoomControl: false })
        .setView([34.090, -118.507], 11);

    // disable drag and zoom handlers
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    // disable tap handler, if present.
    if (map.tap) map.tap.disable();
});