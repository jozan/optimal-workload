### My workload optimizer

Tehtävän ratkaisemisessa on kokeiltu deklaratiivista ohjelmointiparadigmaa, eli funktionaalista ohjelmointia. Sen yksi perusajatuksista on muuttumaton ajatusmalli (immutable), eli kerran luotua ei voi enää koskaan muokata.

Runko on ottanut mallia [Fatih Cetinkayan](https://github.com/cmfatih/knapsack) knapsack moduulista, joka on kirjoitettu Javascriptillä. Lopputulos kuitenkin on tehty [Immutable.js](https://facebook.github.io/immutable-js/)-kirjastolla, joka tuo ns. "immutable collections" javascriptille.

[Lodash](https://lodash.com/) tuo mukavia pieniä apufunktiota kun javascriptin omat metodit eivät enää riitä. 

### Quick setup

```
npm install -g gulp
npm install
gulp watch
```
