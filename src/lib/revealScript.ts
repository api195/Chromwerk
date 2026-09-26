/**
 * Scroll-Reveals ohne Warten auf React
 * ------------------------------------------------------------------
 * Dieses kleine Skript wird im Root-Layout direkt ins HTML geschrieben und
 * läuft, sobald der Browser es liest – noch bevor das JavaScript-Bundle
 * geladen und React „hydriert" ist.
 *
 * Warum? Früher waren Hero, Überschriften und Karten unsichtbar, bis React
 * fertig war. Auf einem schnellen iPhone merkt man das nicht, auf einem
 * günstigen Android-Handy waren das mehrere Sekunden schwarzer Bildschirm.
 *
 * Ablauf:
 *  • `data-js` auf <html> aktiviert die versteckten Startzustände in
 *    globals.css (ohne JavaScript bleibt alles einfach sichtbar).
 *  • EIN IntersectionObserver für die ganze Seite markiert Elemente mit
 *    `data-reveal="…"` beim Hineinscrollen mit `data-shown`. Die eigentliche
 *    Animation ist eine CSS-Transition (läuft auf der GPU, unabhängig vom
 *    Haupt-Thread).
 *  • Ein MutationObserver erfasst Elemente, die später dazukommen
 *    (Seitenwechsel ohne Neuladen).
 */
function revealBoot() {
  var root = document.documentElement;
  root.setAttribute("data-js", "");

  if (!("IntersectionObserver" in window)) {
    // Uralt-Browser: Inhalte sofort zeigen statt sie zu verstecken.
    root.removeAttribute("data-js");
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-shown", "");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -60px 0px" }
  );

  function scan() {
    var pending = document.querySelectorAll("[data-reveal]:not([data-shown])");
    // observe() ist für bereits beobachtete Elemente wirkungslos.
    for (var i = 0; i < pending.length; i++) io.observe(pending[i]);
  }

  new MutationObserver(scan).observe(root, { childList: true, subtree: true });
  scan();
}

export const revealScript = `(${revealBoot.toString()})();`;
