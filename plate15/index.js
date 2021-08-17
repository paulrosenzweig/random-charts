import vega from "https://cdn.skypack.dev/vega";
import vegaLite from "https://cdn.skypack.dev/vega-lite";
import vegaEmbed from "https://cdn.skypack.dev/vega-embed";
const elem = document.getElementById("chart");
vegaEmbed(elem, {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: {
    values: `"Year","Children"
"1860","7"
"1870","10351"
"1878","72655"
"1884","110150"
"1888","120533"
"1891","156836"
"1897","180565"
`,
    format: { type: "csv" },
  },
  transform: [{ calculate: "-datum.Children", as: "negativeChildren" }],
  width: 400,
  height: 500,
  config: { view: { stroke: "transparent" } },
  layer: [
    {
      mark: "bar",
      encoding: {
        x: {
          field: "Year",
          type: "ordinal",
          scale: { padding: 0.6 },
          axis: {
            title: false,
            domain: false,
            ticks: false,
            orient: "top",
            labelAngle: 0,
          },
        },
        y: {
          field: "negativeChildren",
          type: "quantitative",
          axis: false,
        },
      },
    },
    {
      mark: { type: "text", dy: 8 },
      encoding: {
        text: {
          field: "Children",
          format: ",",
        },
        x: {
          field: "Year",
          type: "ordinal",
          scale: { padding: 0.6 },
        },
        y: {
          field: "negativeChildren",
          type: "quantitative",
          axis: false,
        },
      },
    },
  ],
});
