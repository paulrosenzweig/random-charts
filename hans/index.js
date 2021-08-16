import vega from "https://cdn.skypack.dev/vega";
import vegaLite from "https://cdn.skypack.dev/vega-lite";
import vegaEmbed from "https://cdn.skypack.dev/vega-embed";
const elem = document.getElementById("chart");
const url =
  "https://raw.githubusercontent.com/vega/vega-datasets/master/data/gapminder.json";
vegaEmbed(elem, {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: { url },
  params: [
    {
      name: "year",
      value: 1970,
      bind: { input: "range", min: 1955, max: 2000, step: 5 },
    },
  ],
  transform: [{ filter: { field: "year", equal: { expr: "year" } } }],
  mark: { type: "circle", tooltip: true },
  width: 400,
  height: 400,
  encoding: {
    x: {
      field: "life_expect",
      type: "quantitative",
      scale: { domain: [30, 90] },
    },
    y: {
      field: "fertility",
      type: "quantitative",
      scale: { zero: false, domain: [1, 9] },
    },
    size: {
      field: "pop",
      type: "quantitative",
      legend: false,
      scale: { domain: [1000000, 1500000000] },
    },
    color: { field: "country", type: "nominal" },
  },
});
