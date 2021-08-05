import vega from "https://cdn.skypack.dev/vega";
import vegaLite from "https://cdn.skypack.dev/vega-lite";
import vegaEmbed from "https://cdn.skypack.dev/vega-embed";
const elem = document.getElementById("chart");
const width = 500;
const height = 500;
vegaEmbed(elem, {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: {
    values: [
      { year: 1790, proportionFree: 0.08 },
      { year: 1800, proportionFree: 0.11 },
      { year: 1810, proportionFree: 0.135 },
      { year: 1820, proportionFree: 0.13 },
      { year: 1830, proportionFree: 0.14 },
      { year: 1840, proportionFree: 0.13 },
      { year: 1850, proportionFree: 0.12 },
      { year: 1860, proportionFree: 0.11 },
      { year: 1870, proportionFree: 1 },
    ],
    format: {
      parse: { year: "utc:'%Y'" },
    },
  },
  width,
  height,
  encoding: {
    y: {
      field: "proportionFree",
      type: "quantitative",
      scale: { domain: [1, 0] },
      axis: false,
    },
    x: {
      field: "year",
      type: "temporal",
      scale: { type: "utc" },
      axis: { orient: "top", ticks: false, grid: false, title: false },
    },
  },
  layer: [
    {
      mark: "area",
    },
    {
      mark: { type: "text", yOffset: -10 },
      encoding: {
        text: {
          field: "proportionFree",
          type: "quantitative",
          format: ".0%",
        },
      },
    },
  ],
});
