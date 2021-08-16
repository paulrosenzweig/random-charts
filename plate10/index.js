import vega from "https://cdn.skypack.dev/vega";
import vegaLite from "https://cdn.skypack.dev/vega-lite";
import vegaEmbed from "https://cdn.skypack.dev/vega-embed";
const elem = document.getElementById("chart");
vegaEmbed(elem, {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: {
    values: `"Age","Group","Status","Percent"
"15-40","Germany","Single","62.1"
"15-40","Germany","Married","37.3"
"15-40","Germany","Widowed and Divorced","0.6"
"15-40","Black","Single","41"
"15-40","Black","Married","54"
"15-40","Black","Widowed and Divorced","5"
"40-60","Germany","Single","9.6"
"40-60","Germany","Married","84.8"
"40-60","Germany","Widowed and Divorced","5.6"
"40-60","Black","Single","4.5"
"40-60","Black","Married","73.5"
"40-60","Black","Widowed and Divorced","22"
"60+","Germany","Single","8.2"
"60+","Germany","Married","62.2"
"60+","Germany","Widowed and Divorced","29.6"
"60+","Black","Single","4.5"
"60+","Black","Married","54.5"
"60+","Black","Widowed and Divorced","41"
`,
    format: { type: "csv" },
  },
  width: 400,
  height: 110,
  config: { view: { stroke: "transparent" } },
  mark: "bar",
  encoding: {
    x: { field: "Percent", type: "quantitative", axis: false },
    y: {
      field: "Group",
      type: "nominal",
      scale: { padding: 0.4 },
      axis: { title: false, domain: false, ticks: false },
      sort: ["Single", "Married", "Widowed and Divorced"],
    },
    order: { field: "color_Status_sort_order", type: "quantitative" },
    row: { field: "Age", type: "nominal", axis: { title: false } },
    color: {
      field: "Status",
      type: "nominal",
      legend: {
        orient: "top",
        title: false,
        symbolType: "circle",
        symbolSize: 300,
      },
      scale: {
        domain: ["Single", "Married", "Widowed and Divorced"],
        range: ["rgb(192, 0, 38)", "rgb(245, 166, 9)", "rgb(59, 78, 64)"],
      },
    },
  },
});
