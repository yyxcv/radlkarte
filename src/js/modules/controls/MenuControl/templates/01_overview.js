const template = `
      <div class="leaflet-sidebar-pane active" id="radlkarte_legend">
          <h2 class="leaflet-sidebar-header">
          <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span> Übersicht
        </h2>
        <h3>Entspannt durch
          <a href="#klagenfurt">Klagenfurt</a>,
          <a href="#linz">Linz</a>,
          <a href="#rheintal">Rheintal</a>,
          <a href="#schwarzatal">Schwarzatal</a>,
          <a href="#steyr">Steyr</a> und
          <a href="#wien">Wien</a>
        </h3>
        <p>
          Viele Wege führen zum Ziel. Finden Sie Ihren optimalen Weg durch die Stadt mit der Radlkarte der <a
            href="https://www.radlobby.at" target="_blank">Radlobby</a>. Auf zu neuen Ufern, unbekannten
          Gegenden und neuen Alternativen zu Ihren alltäglichen Routen.
        </p>
        <h4>Farbe = Gemütlichkeit</h4>
        <ul class="legend legend-leftified">
          <li>
            Gemütlich
            <div class="legend legend-calm"></div>
          </li>
          <li>
            Durchschnittlich
            <div class="legend legend-medium"></div>
          </li>
          <li>
            Stressig
            <div class="legend legend-stressful"></div>
          </li>
        </ul>
        <h4>Strichstärke = Relevanz</h4>
        <ul class="legend legend-leftified">
          <li>
            Hauptrouten
            <div class="legend legend-main"></div>
          </li>
          <li>
            Nebenrouten
            <div class="legend legend-regional"></div>
          </li>
        </ul>
        <h4>Spezielle Eigenschaften</h4>
        <ul class="legend legend-leftified">
          <li>
            Einbahn
            <div class="legend-container">
              <div class="legend legend-main"></div>
              <div>
                <div class="legend legend-oneway"></div>
                <div class="legend legend-oneway"></div>
                <div class="legend legend-oneway"></div>
                <div class="legend legend-oneway"></div>
              </div>
            </div>
          </li>
          <li>
            Unbefestigt (oder sehr uneben)
            <div class="legend legend-unpaved"></div>
          </li>
          <li>
            Steil
            <div class="legend-container">
              <div class="legend legend-main"></div>
              <div class="legend legend-steep"></div>
            </div>
          </li>
        </ul>
        <p>&nbsp;</p>
        <p>
          <img src="css/layers-2x.png" width="30" alt="Symbol: Ebenenauswahl">
          Fürs Radeln hilfreiche Orte können rechts oben in den <strong>Kartenebenen</strong>
          eingeblendet werden.
        </p>
      </div>
  `

export default template;
