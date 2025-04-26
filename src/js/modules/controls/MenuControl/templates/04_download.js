const template = `
   <div class="leaflet-sidebar-pane" id="radlkarte_download">
        <h2 class="leaflet-sidebar-header">
          <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>Open Source
        </h2>
        <p>
          Die Wegenetze (und auch die Software) sind open source und damit frei verfügbar auf <a
            href="https://github.com/markusstraub/radlkarte" target="_blank">Github</a> (Apache-Lizenz 2.0).
        </p>
        <h3>Download der Wegenetze</h3>
        <p>
          Die Wegenetze stehen im .geojson-Format zum Download zur Verfügung:
        </p>
        <p>
          <a href="data/radlkarte-klagenfurt.geojson" target="_blank">Klagenfurt</a><br>
          <a href="data/radlkarte-linz.geojson" target="_blank">Linz</a><br>
          <a href="data/radlkarte-rheintal.geojson" target="_blank">Rheintal (Dornbirn, Hohenems und
            Umgebung)</a><br>
          <a href="data/radlkarte-schwarzatal.geojson" target="_blank">Schwarzatal</a><br>
          <a href="data/radlkarte-steyr.geojson" target="_blank">Steyr</a><br>
          <a href="data/radlkarte-wien.geojson" target="_blank">Wien</a><br>
        </p>
        <p>
          Bitte <a href="mailto:radlkarte@radlobby.at?subject=Die%20Radlkarte%20kommt%20zum%20Einsatz%20in..">schreiben
            Sie uns</a>, wenn Sie die Radlkarte für Ihre Arbeiten verwenden und geben Sie als Datenquelle
          <strong>© radlkarte.at - Radlobby Österreich</strong> an. Wir freuen uns, wenn die Radlkarte zum
          Einsatz
          kommt!
        </p>
      </div>
`

export default template;
