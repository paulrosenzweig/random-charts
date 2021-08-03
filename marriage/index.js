import vega from "https://cdn.skypack.dev/vega";
import vegaLite from "https://cdn.skypack.dev/vega-lite";
import vegaEmbed from "https://cdn.skypack.dev/vega-embed";
const elem = document.getElementById("chart");
const statuses = [
  "Never married",
  "Now married",
  "Widowed",
  "Divorced",
  "Separated",
];
const width = 300;
const height = 400;
vegaEmbed(elem, {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: { url: "data.csv" },
  transform: [{ fold: statuses }],
  config: { concat: { spacing: 0 } },
  hconcat: [
    {
      mark: "bar",
      width,
      height,
      transform: [{ filter: { field: "Sex", equal: "Male" } }],
      encoding: {
        y: {
          field: "Age",
          type: "ordinal",
          sort: "-y",
          scale: { padding: 0 },
        },
        order: { field: "color_value_sort_index", type: "quantitative" },
        x: {
          field: "value",
          type: "quantitative",
          scale: { domain: [100, 0] },
        },
        color: { field: "key", type: "ordinal", sort: statuses },
      },
    },
    {
      mark: "bar",
      width,
      height,
      transform: [{ filter: { field: "Sex", equal: "Female" } }],
      encoding: {
        y: {
          field: "Age",
          type: "ordinal",
          sort: "-y",
          axis: { orient: "right" },
          scale: { padding: 0 },
        },
        order: { field: "color_value_sort_index", type: "quantitative" },
        x: {
          field: "value",
          type: "quantitative",
          scale: { domain: [0, 100] },
        },
        color: { field: "key", type: "ordinal", sort: statuses },
      },
    },
  ],
});
