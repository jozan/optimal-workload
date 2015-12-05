### My workload optimizer

Javascriptillä tehdyn algoritmin pohjalla ovat [Wikipedian pseudokoodi](https://en.wikipedia.org/wiki/Knapsack_problem#0.2F1_knapsack_problem) ja [Go-kielinen toteutus](http://rosettacode.org/wiki/Knapsack_problem/0-1#Go).

Ohjelmointikielenä on käytetty Javascriptin uusinta standardia [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/index.html). Kaikki selaimet eivät sitä kuitenkaan vielä tue, joten koodi [transpiloidaan](https://en.wikipedia.org/wiki/Source-to-source_compiler) tuetuimpaan Javascriptin standardiin (ES5) buildauksen yhteydessä.

##### Käytetyt kirjastot 

- [Immutable.js](https://facebook.github.io/immutable-js/) tuo ns. "immutable collectionit" javascriptiin
- [VelocityJS](http://velocityjs.org/) Animointikirjasto
- [noUiSlider](http://refreshless.com/nouislider/) Range Slider
- [jQuery](https://jquery.com/)

### Quick setup

```
npm install -g gulp
npm install
gulp watch
```

To build for production run `gulp --production`.
