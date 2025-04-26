const template = `

      <div class="leaflet-sidebar-pane" id="radlkarte_privacy">
        <h2 class="leaflet-sidebar-header">
          <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>Datenschutz
        </h2>
        <h3>Matomo</h3>
        <p>
          Diese Website benutzt den Open Source Webanalysedienst Matomo. Matomo verwendet Technologien, die
          die Analyse des Nutzerverhaltens ermöglichen. Die durch Matomo erfassten Informationen über die
          Benutzung dieser Website werden auf unserem Server gespeichert.
        </p>
        <p>
          Mithilfe von Matomo sind wir in der Lage Daten über die Nutzung unserer Website zu
          erfassen und zu analysieren. Für uns relevant sind:
        </p>
        <ul>
          <li>Entwicklung der Besucheranzahl pro Radlkarte-Region</li>
          <li>Statistiken über die verwendeten Betriebssysteme, Browser, Bildschirmgrößen</li>
        </ul>
        <p>
          Die Nutzung dieses Analyse-Tools erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir als
          Websitebetreiber haben ein berechtigtes Interesse an der anonymisierten Analyse des
          Nutzerverhaltens, um unser Angebot zu optimieren.
        </p>
        <h4>Personenbezogene Daten</h4>
        <p>
          Wir haben Matomo in einer Weise konfiguriert, dass keine personenbezogenen Daten gespeichert werden,
          die einen Einwilligung durch den Benutzer erforderlich machen. Dennoch besteht die Möglichkeit das
          Tracking per Opt-Out zu deaktivieren (siehe entsprechendes Kapitel weiter unten).
        </p>
        <h4>IP-Anonymisierung</h4>
        <p>
          Bei der Analyse mit Matomo setzen wir IP-Anonymisierung ein. Hierbei wird Ihre IP-Adresse vor der
          Analyse gekürzt, sodass Sie Ihnen nicht mehr eindeutig zuordenbar ist.
        </p>
        <h4>Verweis-URL (Referrer)</h4>
        <p>
          Wir speichern nicht die gesamte Verweis-URL, sondern nur den Domain-Teil der URL.
          Es ist so nur möglich nachzuvollziehen, dass die Anfrage von z.B. google.com oder facebook.com
          weitergeleitet wurde, andere Teile der Verweis-URL die ggf. auch Rückschlüsse auf einzelnen
          Personen möglich machen könnte, werden so nicht verarbeitet bzw. gespeichert.
        </p>
        <h4>Cookies</h4>
        <p>
          Es werden keine Cookies gespeichert. (Ausnahme: "Matomo Opt-Out"-Cookie, siehe Kapitel Tracking
          deaktivieren) </p>
        <h4>Fingerprinting</h4>
        <p>
          Es kommt kein Fingerprinting im klassischen Sinn zum Einsatz, das es potenziell ermöglichen würde
          einen wiederkehrenden Benutzer über einen längeren Zeitraum, oder über verschiedenen Webseiten
          hinweg wiederzuerkennen (was zwingend eine Einwilligung der Benutzer voraussetzen würde).
        </p>
        <p>
          Matomo setzt auf eine ähnliche Methode, die aber bedeutend Privatsphäre- und datenschutzfreundlicher
          ist. Es für jeden Zugriff eine config_id erstellt (ein Hashwert errechnet aus einer Zufallszahl,
          Eigenschaften wie verwendetes Betriebsystem, Browser, Plugins, anonymisierten IP-Adresse,
          Systemsprache), die nur 24
          Stunden und
          nur für diese spezifische Domain gültig ist.
        </p>
        <p>
          Ein wiederkehrendes Identifizieren eines Benutzers über 24h hinaus oder über mehrere Webseiten
          (selbst der gleichen Matomo-Instanz) ist damit nicht möglich.
        </p>
        <p>
          Dies ist auch ohne Einverständnis des Benutzers (in Kombination mit anderen Maßnahmen, wie einer
          Opt-Out-Möglichkeit) mit den Vorgaben der Europäischen Datenschutzgrundverordnung vereinbar. (z.B.
          hat die französischen Datenschutzbehörde CNIL dies bereits offiziell bestätigt)
        </p>
        <h4>Hosting</h4>
        <p>
          Wir hosten Matomo ausschließlich auf einer von uns angemieteten Webserver-Instanz bei der Firma
          Easyname GmbH (Fernkorngasse 10/3/501, 1100 Wien). Easyname GmbH agiert als Auftragsverarbeiter nach
          Art. 28 DSGVO. Es wurde ein entsprechender Auftragsverarbeiter-Vertrag zwischen uns und der Easyname
          GmbH abgeschlossen, sodass alle
          Analysedaten bei uns verbleiben und nicht an Dritte weitergegeben werden.
        </p>
        <h4>Tracking deaktivieren</h4>
        <p>
          Wir respektieren das "do not track"-HTTP-Headerfeld bei Zugriffsanfragen. D.h. wenn Sie in Ihrem
          Browser diese Option aktiviert haben (global oder nur für unsere Seite) wird von uns kein Tracking
          durchgeführt </p>
        <p>
          Wenn Sie mit der Speicherung und Nutzung Ihrer Daten nicht einverstanden sind, können Sie die
          Speicherung und Nutzung hier deaktivieren. In diesem Fall wird in Ihrem Browser ein Opt-Out-Cookie
          hinterlegt (Name: mtm_consent_removed für die Domain: radlkarte.radlobby.at) das verhindert, dass
          Matomo Nutzungsdaten gespeichert werden. Wenn Sie Ihre Cookies löschen, hat dies zur Folge, dass auch das
          Matomo Opt-Out-Cookie gelöscht wird. Das Opt-Out muss bei einem erneuten Besuch unserer Seite dann
          wieder aktiviert werden. </p>
        <p>
          Hier können Sie das Tracking deaktivieren:
        </p>
        <div id="matomo-opt-out"></div>
        <script
          src="https://matomo.radlobby.at/index.php?module=CoreAdminHome&action=optOutJS&divId=matomo-opt-out&language=de&showIntro=0"></script>
        <h3>Ihre Rechte</h3>
        <p>
          Ihnen stehen nach DSGVO die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung,
          Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer
          Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer
          Weise verletzt worden sind, können Sie sich bei der Aufsichtsbehörde beschweren. In Österreich ist
          dies die Datenschutzbehörde.
        </p>
        <h3>Kontakt</h3>
        <p>
          Falls Sie Fragen haben, oder Sie von Ihren Rechten Gebrauch machen möchten, nehmen Sie bitte Kontakt
          mit uns auf:
        </p>
        <p>
          <a href="https://www.radlobby.at" target="_blank">Radlobby Österreich</a><br>
          Lichtenauergasse 4/1/1<br>
          1020 Wien<br>
          <a href="mailto:datenschutz@radlobby.at" target="_blank">datenschutz@radlobby.at</a>
        </p>
      </div>
`
export default template;
