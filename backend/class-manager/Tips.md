#### While creating jersey webapp, it might happen that the arctype is not shown in the maven list.
This issue can be solved by adding a new Maven Archetype.
- Open Window > Preferences
- Open Maven > Archetypes
- Click Add Remote Catalog and add the following:
- Catalog File: http://repo1.maven.org/maven2/archetype-catalog.xml
- Description: maven catalog

Restart eclipse
```
search filter:jersey-quickstart-webapp
```
