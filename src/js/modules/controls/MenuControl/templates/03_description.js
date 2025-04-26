const template = `

      <div class="leaflet-sidebar-pane" id="radlkarte_description">
        <h2 class="leaflet-sidebar-header">
          <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span> Die Radlkarte stellt
          sich vor
        </h2>
        <p>
          Die Radlkarte der <a href="https://www.radlobby.at" target="_blank">Radlobby</a> ist eine kostenlose
          Online-Orientierungshilfe, mit der Sie Ihre Fahrten mit dem Fahrrad schneller und gemütlicher
          gestalten können. Sie ist jederzeit im Browser bereit, ob am Smartphone, Tablet oder PC.
        </p>
        <h3>Wegenetz</h3>
        <p>
          Ein <strong>alltagstaugliches Wegenetz</strong> spiegelt unsere langjährige Erfahrung des
          Alltagsradelns und unsere Ortskenntnis wider. Dieses Netz zeigt, welche Strecken sich am besten fürs
          Radeln eignen. So hilft Ihnen die Radlkarte beim <strong>Finden von Routenvarianten zwischen Ihren
            Zielen</strong>. Die Abwägung zwischen Direktheit/Schnelligkeit und Gemütlichkeit/Sicherheit
          liegt dabei ganz bei Ihnen: ist noch genügend Zeit für eine entspannte Strecke bis zum Läuten der
          Schulglocken? Ist der nächste Arbeitstermin doch schon näher als gewünscht und Schnelligkeit ist die
          oberste Prämisse? Geht's gemeinsam mit Ihren Kindern zur Schule oder in den Park?
        </p>
        <h3>Sicherheitskategorien</h3>
        <p>
          Zur individuellen Entscheidungsfindung sind Abschnitte hinsichtlich unserer (subjektiven) Erfahrung
          zur <strong>Sicherheit bzw. Gemütlichkeit in drei Kategorien</strong> bewertet: gemütlich,
          durchschnittlich, stressig. Wir halten uns dabei nicht zwingend an <a
            href="https://www.radlobby.at/wien/radverkehrsnetz" target="_blank">zum Teil leider lückenhafte
            Radverkehrsnetze</a>. Die drei Kategorien werden anhand der Farbe unterschieden. Abschnitte, die
          nur in eine Richtung befahren werden können, sind durch Pfeile markiert:
        <p>
        <ul class="legend">
          <li>
            <strong>Gemütlich (dunkelblau)</strong>
            <div class="legend legend-calm"></div>
            Vom Autoverkehr getrennter Weg oder Straße mit sehr geringem Kfz-Aufkommen und niedrigen
            Geschwindigkeiten (z.B. Radwege oder Fußgängerzonen, auch wenn das Vorankommen durch viel
            Fußverkehr möglicherweise schwierig ist)
          </li>
          <li>
            <strong>Durchschnittlich (hellblau)</strong>
            <div class="legend legend-medium"></div>
            Radeln im Mischverkehr mit moderatem und langsamem Kfz-Verkehr (z.B. Tempo 30 Zonen in denen das
            Tempolimit meistens eingehalten wird) oder baulich getrennte Wege, die aber dennoch
            viele Gefahrenstellen mit Kfz haben (z.B. Ausfahrten und Kreuzungen).
          </li>
          <li>
            <strong>Stressig (orange)</strong>
            <div class="legend legend-stressful"></div>
            Strecken, die für ein vollständiges Wegenetz nötig, aber z.B. aufgrund von starkem Kfz-Verkehr
            oder <a href="https://www.radlobby.at/oesterreich/abstand-zur-tuerzone-macht-sicher"
              target="_blank">beengten Verhältnissen</a> unangenehm sind (z.B. vielbefahrene Schleichwege
            in Tempo 30 Zonen, Fahrradstreifen eng neben Parkplätzen, Überlandstraßen, ...)
          </li>
        </ul>
        <h3>Prioritätsstufen</h3>
        <p>
          Zusätzlich ist das Wegenetz für mehr Übersichtlichkeit - vor allem bei langen Strecken quer durch
          die ganze Stadt - in <strong>Prioritätsstufen</strong> gegliedert. Beim Zoomen in der Karte werden
          lokale und regionale Nebenrouten nach und nach ausgeblendet bzw. nur dünn dargestellt. Überregionale
          Routen sind immer dick hervorgehoben.
        </p>
        <ul class="legend">
          <li>
            <strong>Hauptrouten (dick)</strong>
            <div class="legend legend-main"></div>
            <span>Hauptrouten - vor allem relevant für längere Strecken</span>
          </li>
          <li>
            <strong>Nebenrouten (dünn)</strong>
            <div class="legend legend-regional"></div>
            Ergänzende Routen, Abkürzungen, Zubringer
          </li>
        </ul>
        <h3>Spezielle Eigenschaften</h3>
        <ul class="legend">
          <li>
            <strong>Einbahn (Pfeile)</strong>
            <div class="legend-container">
              <div class="legend legend-main"></div>
              <div>
                <div class="legend legend-oneway"></div>
                <div class="legend legend-oneway"></div>
                <div class="legend legend-oneway"></div>
                <div class="legend legend-oneway"></div>
              </div>
            </div>
            Einbahnen, die nicht für den Radverkehr geöffnet sind
          </li>
          <li>
            <strong>Unbefestigt oder sehr uneben (strichliert)</strong>
            <div class="legend legend-unpaved"></div>
            Wegbeschaffenheiten, die unangenehm sein können: beispielsweise nicht asphaltierte Wege (bei
            Regen) oder sehr unebenes Kopfsteinpflaster
          </li>
          <li>
            <strong>Steile Wege (Querstriche)</strong>
            <div class="legend-container">
              <div class="legend legend-main"></div>
              <div class="legend legend-steep"></div>
            </div>
            Wege mit mehr als 5-6% Steigung oder Gefälle (kurze Rampen ausgenommen)
          </li>
        </ul>
        <h3>Problemstellen</h3>
        <p>
          Punktuelle Probleme sind in diesen Kategorien hervorgehoben:
        </p>
        <ul class="legend">
          <li>
            <img src="css/dismount.svg" width="60" alt="Symbol: Schiebestellen"><strong>Schiebestelle</strong><br>
            Schiebe-Empfehlung beispielsweise bei unübersichtlichen Kreuzungen oder Fahrverboten
          </li>
          <li>
            <img src="css/nocargo.svg" width="60" alt="Symbol: Untauglichkeit für Spezialräder"><strong>Untauglichkeit
              für
              Spezialräder</strong><br>
            Stellen, die mit Lastenrädern, Rädern mit Anhängern, oder anderen breiten bzw. schweren Rädern
            umständlich oder gar nicht passierbar sind
          </li>
          <li>
            <img src="css/warning.svg" width="60" alt="Symbol: Allgemeine Problemstelle"><strong>Allgemeine
              Problemstelle</strong><br>
            bzw. Hinweis
          </li>
        </ul>
        <p>
          Für eine Beschreibung der Problemstelle bewegen Sie den Mauszeiger über das Symbol
          bzw. tippen Sie das Symbol an.
        </p>
        <h3>Bike-Sharing, Radgeschäfte und mehr</h3>
        <p>
          <img src="css/layers-2x.png" width="30" alt="Symbol: Ebenenauswahl">
          Fürs Radeln hilfreiche Orte können rechts oben in den <strong>Kartenebenen</strong>
          eingeblendet werden.
        </p>
        <p>
          <strong>Details per Klick / Antippen:</strong>
          Adresse, Öffnungszeiten, Website und mehr.
        </p>
        <h4>Kategorien</h4>
        <ul class="legend">
          <li>
            <img src="css/wienmobilrad.svg" width="30" alt="Symbol: Leihrad">
            <img src="css/citybikelinz.svg" width="30" alt="Symbol: Leihrad">
            <img src="css/nextbike.svg" width="30" alt="Symbol: Leihrad">
            <strong>Leihräder</strong><br>
            Stationen von Leihradsystemen (Bike-Sharing) mit der Anzahl an aktuell verfügbaren Rädern.
            Graues Symbol: leer (kein Rad verfügbar).
            Derzeit unterstützt werden
            <a href="https://www.wienerlinien.at/wienmobil/rad" target="_blank">WienMobil&nbsp;Rad</a>,
            <a href="https://www.citybikelinz.at" target="_blank">city&nbsp;bike&nbsp;Linz</a>,
            <a href="https://www.nextbike.at/de/klagenfurt" target="_blank">Nextbike&nbsp;Klagenfurt</a>,
            und
            <a href="https://www.nextbike.at/de/niederoesterreich/" target="_blank">Nextbike&nbsp;Niederösterreich</a>.
          </li>
          <li>
            <img src="css/subway.svg" width="30" alt="Symbol: U-Bahn">
            <img src="css/sbahn.svg" width="30" alt="Symbol: S-Bahn">
            <img src="css/railway.svg" width="30" alt="Symbol: Bahnhof">
            <strong>Öffentlicher Verkehr</strong><br>
            U-Bahn- und S-Bahn-Stationen sowie Bahnhöfe.
          </li>
          <li>
            <img src="css/bicycleShop.svg" width="30" alt="Symbol: Fahrradgeschäfte">
            <strong>Fahrradgeschäfte</strong><br>
            Verkauf bzw. Reparatur von Fahrrädern sowie Zubehör.
          </li>
          <li>
            <img src="css/bicycleRepairStation.svg" width="30" alt="Symbol: Reparaturstation">
            <strong>Reparaturstationen</strong><br>
            Fahrrad-Reparaturbereich, in der Regel mit Werkzeug, Luftpumpe und Montageständer ausgestattet.
          </li>
          <li>
            <img src="css/bicyclePump.svg" width="30" alt="Symbol: Luftpumpe">
            <strong>Luftpumpen</strong><br>
            Frei zugängliche Luftpumpen.
          </li>
          <li>
            <img src="css/bicycleTubeVending.svg" width="30" alt="Symbol: Schlauchomat">
            <strong>Schlauchomaten</strong><br>
            Automaten zum Kauf von Fahrradschläuchen.
          </li>
          <li>
            <img src="css/drinkingWater.svg" width="30" alt="Symbol: Trinkwasser">
            <strong>Trinkwasser</strong><br>
            Öffentlich zugängliche Trinkwasserbrunnen oder -quellen.
            Achtung: in den Wintermonaten meist geschlossen!
          </li>
        </ul>
        <p>
          <strong>Graue Symbole</strong> bedeuten für Leihradstationen, dass kein Rad verfügbar ist.
          Bei allen anderen Kategorien steht es für derzeit geschlossen / nicht verfügbar /
          bzw. keine bekannten Öffnungszeiten.
        </p>
        <p>
          Die Leihradstationen werden von der offiziellen Nextbike API abgefragt und somit minutengenau.
          Alle anderen Orte sind von <a href="https://www.openstreetmap.org" target="_blank">OpenStreetMap</a>
          entnommen und werden täglich aktualisiert.
        </p>
        <h3>Viel Spaß beim Erkunden!</h3>
        <p>
          Wir hoffen, dass Sie sich mithilfe der Radlkarte leichter zurechtfinden und wünschen Ihnen schönes
          und angenehmes Radfahren. Sollten Sie Verbesserungsvorschläge oder neue Routenvorschläge haben, <a
            href="mailto:radlkarte@radlobby.at">freuen wir uns auf Rückmeldungen</a>.
          Sie können Problemstellen (für Wien) auch direkt im <a href="https://www.radkummerkasten.at"
            target="_blank">Radkummerkasten</a> melden.
        </p>
      </div>
`

export default template;
