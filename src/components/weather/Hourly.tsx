import React, { useState } from "react";
import { useApp, useTheme, useService } from "contexts";
import { Custom } from "components";
import { Box } from "@mui/material";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import {
  LineChart,
  // BarChart,
  // PieChart,
  // ScatterChart,
  // RadarChart,
  // MapChart,
  // TreeChart,
  // TreemapChart,
  // GraphChart,
  // GaugeChart,
  // FunnelChart,
  // ParallelChart,
  // SankeyChart,
  // BoxplotChart,
  // CandlestickChart,
  // EffectScatterChart,
  // LinesChart,
  // HeatmapChart,
  // PictorialBarChart,
  // ThemeRiverChart,
  // SunburstChart,
  // CustomChart,
} from "echarts/charts";
import {
  // GridSimpleComponent,
  GridComponent,
  // PolarComponent,
  // RadarComponent,
  // GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  // ToolboxComponent,
  TooltipComponent,
  // AxisPointerComponent,
  // BrushComponent,
  TitleComponent,
  // TimelineComponent,
  // MarkPointComponent,
  // MarkLineComponent,
  // MarkAreaComponent,
  // LegendComponent,
  // LegendScrollComponent,
  // LegendPlainComponent,
  // DataZoomComponent,
  // DataZoomInsideComponent,
  // DataZoomSliderComponent,
  // VisualMapComponent,
  // VisualMapContinuousComponent,
  // VisualMapPiecewiseComponent,
  // AriaComponent,
  // TransformComponent,
  // DatasetComponent,
} from "echarts/components";

import {
  // CanvasRenderer,
  SVGRenderer,
} from "echarts/renderers";
import { Constants } from "utils";
import { HWeather } from "helpers";

type Props = {
  date: any;
};

export const Hourly = (props: Props) => {
  const { margin } = useTheme();
  const { location, t } = useApp();
  const { weather } = useService();
  const [option, setOption] = useState({});

  const validdatetime = HWeather.getDateAsParam(props.date);
  const parameters = [];
  const locations = Constants.LOCATIONS_GEO[location];

  React.useEffect(() => {
    const fetchData = async () => {
      // const response = await service.weather.makeRequest(
      //   validdatetime,
      //   parameters,
      //   locations
      // );
      // if (response) {
      //   const values = response[Constants.WHEATER_PARAMS.TEMPERATURE];
      //   setOption({
      //     grid: {
      //       x: 40,
      //       y: 40,
      //       x2: 80,
      //       y2: 40,
      //     },
      //     // title: [
      //     //   {
      //     //     left: "center",
      //     //     text: t.title.hourly,
      //     //   },
      //     // ],
      //     xAxis: {
      //       type: "category",
      //       name: t.label.timeline,
      //       data: Object.keys(values).map((item: any) =>
      //         Helpers.Date.toTimeString(
      //           Helpers.Date.toSeconds(new Date(item)),
      //           false
      //         )
      //       ),
      //     },
      //     yAxis: {
      //       name: t.label.temp,
      //       type: "value",
      //     },
      //     series: [
      //       {
      //         data: Object.values(values),
      //         type: "line",
      //       },
      //     ],
      //   });
      // }
    };
    fetchData();
  }, [props.date]);

  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    SVGRenderer,
  ]);

  return (
    <Box sx={{ marginTop: margin.sm }}>
      <Custom.Card>
        <ReactEChartsCore
          echarts={echarts}
          option={option}
          notMerge={true}
          lazyUpdate={true}
        />
      </Custom.Card>
    </Box>
  );
};
