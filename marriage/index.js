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
const statuses = [
  "Never married",
  "Now married",
  // "Widowed",
  // "Divorced",
  // "Separated",
  "No longer married",
];
const width = 400;
const height = 500;
vegaEmbed(elem, {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: {
    // url: "data.csv"
    values: `"Age","Sex","Total","Now married","Widowed","Divorced","Separated","Never married"
"15–19","Male","10903653","0.9","0.0","0.0","0.1","99.0"
"20–34","Male","34113759","25.7","0.1","2.5","0.9","70.8"
"35–44","Male","20920715","59.5","0.4","9.8","2.2","28.2"
"45–54","Male","20155362","64.1","1.0","15.2","2.5","17.2"
"55–64","Male","20491435","65.3","2.5","17.1","2.1","13.0"
"65+","Male","24044281","68.6","11.0","12.8","1.3","6.2"
"15–19","Female","10449871","1.1","0.0","0.1","0.1","98.7"
"20–34","Female","32933396","32.8","0.2","3.6","1.6","61.8"
"35–44","Female","20994130","61.0","0.9","12.2","3.3","22.7"
"45–54","Female","20707745","62.4","2.5","18.1","3.3","13.7"
"55–64","Female","21976678","60.2","7.2","19.9","2.5","10.2"
"65+","Female","30029747","45.1","31.6","16.2","1.2","6.0"
`,
    format: {
      type: "csv",
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
  config: { concat: { spacing: 0 } },
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
        axis: { orient: index === 0 ? "left" : "right" },
      },
      order: { field: "color_value_sort_index", type: "quantitative" },
      x: {
        field: "value",
        type: "quantitative",
        scale: { domain: index === 0 ? [100, 0] : [0, 100] },
        axis: {
          title: sex,
          zindex: 1,
          tickCount: 50,
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
