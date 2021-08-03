import vega from "https://cdn.skypack.dev/vega";
import vegaLite from "https://cdn.skypack.dev/vega-lite";
import vegaEmbed from "https://cdn.skypack.dev/vega-embed";
const elem = document.getElementById("chart");
const originalStatuses = [
  "Never married",
  "Now married",
  "Widowed",
  "Divorced",
  "Separated",
];
const statuses = ["Never married", "Now married", "No longer married"];
const width = 400;
const height = 700;
vegaEmbed(elem, {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: {
    url: "data.csv",
    format: {
      parse: Object.fromEntries(originalStatuses.map((s) => [s, "number"])),
    },
  },
  transform: [
    {
      calculate: "datum.Divorced+datum.Separated+datum.Widowed",
      as: "No longer married",
    },
    { fold: statuses },
  ],
  config: { concat: { spacing: -1 } },
  hconcat: ["Male", "Female"].map((sex, index) => ({
    mark: "bar",
    width,
    height,
    transform: [{ filter: { field: "Sex", equal: sex } }],
    encoding: {
      y: {
        field: "Age",
        type: "ordinal",
        sort: "-y",
        scale: { padding: 0 },
        axis: {
          orient: index === 0 ? "left" : "right",
          ticks: false,
          grid: true,
          tickBand: "extent",
          gridColor: "gray",
          gridOpacity: 0.5,
          zindex: 1,
        },
      },
      order: { field: "color_value_sort_index", type: "quantitative" },
      x: {
        field: "value",
        type: "quantitative",
        scale: { domain: index === 0 ? [100, 0] : [0, 100] },
        axis: {
          title: sex,
          zindex: 1,
          values: Array(10)
            .fill(0)
            .map((_, i) => 10 * (i + 1)),
          gridColor: "gray",
          gridOpacity: 0.5,
          ticks: false,
        },
      },
      color: {
        field: "key",
        type: "ordinal",
        sort: statuses,
        scale: {
          range: ["rgb(23, 69, 154)", "rgb(167, 0, 35)", "rgb(55, 121, 83)"],
        },
      },
    },
  })),
});
