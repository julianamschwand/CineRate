# CineRate

## Inhaltsverzeichnis

1. [Einleitung](#einleitung)
2. [Datenbankdesign](#datenbankdesign)
3. [Implementierung, technische Details, Architektur](#implemetierung)
4. [Installation und Setup](#installation)
5. [Benutzerhandbuch](#benutzerhandbuch)
6. [Pobleme und Lösungen](#probleme)
7. [Zusammenfassung und Ausblick](#zusammenfassung)
8. [Anhang](#anhang)


# Einleiting

## Projektziel
Das Projekt CinaRate wurde hergestellt, um einfach Filme zu bewerten und mit anderen Nutzern zu Diskutieren oder einfach ein Kommentar zurück zu legen. 

## Funktonalitäten
-	Kunde wollte von Funktionen her mit Hierarchie:
o	Für Benutzer 
o	Account erstellen und einloggen,
o	Filme von 1-10 Bewerten,
o	Filmtrailer anschauen,
o	Unter Filme kommentieren,
o	Kommentare löschen,
o	Kommentare bearbeiten,
o	Filmrating bearbeiten ^
###

- 	Für Mods
o	Alle Funktionen wie Benutzer,
o	Kommentare löschen
o	Filme zur Webseite hinzufügen,
o	Filme von der Webseite löschen,
o	Filme bearbeiten,
o	Für Admins 
o	Alle Funktionen wie Mods,
o	Andere Benutzer zu Admins oder Mods machen,
o	Filme Hinzufügen
###
-	Kunde wollte von Design her:
o	Gleichmässige NAVBAR
o	Filme können auf Desktop / Handy gleich gut sehen
o	Konsistenter Aufbau vom Design / Farben
o	Gut ansehbare Farben und einfache Login

# Datenbankdesign
Frag Julius Ceasar

# Implementierung, technische Details, Architektur

## Frontend
Unser User Interface ist modern, funktional und international benutzerfreundlich gestaltet.

Alle Textelemente im Interface sind i18n-fähig und können in verschiedene Sprachen übersetzt werden. Platzhalter, Button-Texte, Hinweise und Fehlermeldungen sind sprachneutral aufgebaut und flexibel anpassbar.

Das Login-Formular ist zentral positioniert und visuell klar hervorgehoben. Es enthält Eingabefelder für E-Mail und Passwort sowie eine Option zur Registrierung, falls noch kein Konto besteht. Der grüne Farbakzent hebt zentrale Funktionen hervor und sorgt für konsistente visuelle Führung – unabhängig von der Sprache.

Auf allen Views gibt es oben rechts ein Dropdown für die verschiedenen Sprachen. (Englisch, **Deutsch**, Itailienisch, Spannisch, Chinesisch und Finnisch)

Die „Film hinzufügen“-Funktion ist über den grünen Button oben links erreichbar. Berechtigte Nutzer (z. B. Admins) können Filme mit Titel, Erscheinungsjahr, Dauer und Bild hochladen. Alle Eingabefelder verwenden internationalisierbare Labels und Validierungsnachrichten.

In der Detailansicht eines Films („MovieView“) ist eine übersichtliche Kommentarfunktion integriert. Nutzer können Bewertungen und Kommentare abgeben sowie Rückmeldungen anderer sehen – alle Textbausteine sind auf Mehrsprachigkeit ausgelegt.

## Backend

Frag Julius Caesar

## Datenbankintegrationen

Frag Julius Caesar

## Authentifizierung 

"

## Mehrsprachigkeit
### i18n
Wir haben i18n ausgewählt, aber haben es ohne einer API gemacht. Wir haben i18n so aufgestellt, sodass die Übersetzung in einem Se






























