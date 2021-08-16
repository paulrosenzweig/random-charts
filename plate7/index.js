import vega from "https://cdn.skypack.dev/vega";
import vegaLite from "https://cdn.skypack.dev/vega-lite";
import vegaEmbed from "https://cdn.skypack.dev/vega-embed";
const elem = document.getElementById("chart");
vegaEmbed(elem, {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: {
    values: [
      // data estimated from W.E.B. DuBois' Plate 7
      { year: 1790, white: 0, colored: 0 },
      { year: 1800, white: 92, colored: 101 },
      { year: 1810, white: 43, colored: 77 },
      { year: 1820, white: 30, colored: 42 },
      { year: 1830, white: 56, colored: 46 },
      { year: 1840, white: 37, colored: 29 },
      { year: 1850, white: 27, colored: 35 },
      { year: 1860, white: 13, colored: 21 },
      { year: 1870, white: 8, colored: 17 },
      { year: 1880, white: 27, colored: 33 },
      { year: 1890, white: 19, colored: 18 },
    ],
    format: { parse: { year: "utc:'%Y'" } },
  },
  width: 400,
  height: 400,
  layer: [
    {
      mark: { type: "line", strokeDash: [4, 4] },
      encoding: {
        x: {
          field: "white",
          type: "quantitative",
          scale: { domain: [100, 0] },
        },
        y: { field: "year", type: "temporal", scale: { type: "utc" } },
      },
    },
    {
      mark: { type: "line" },
      encoding: {
        x: { field: "colored", type: "quantitative" },
        y: { field: "year", type: "temporal" },
      },
    },
  ],
});
