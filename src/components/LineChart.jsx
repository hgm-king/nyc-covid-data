import React from "react";
import { ResponsiveLine } from "@nivo/line";

export default function LineChart(props) {
  const { data, field } = props;
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 40, bottom: 50, left: 60 }}
      xScale={{
        type: "time",
        format: "%m/%d/%Y",
        precision: "day",
        useUTC: false,
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: "%b %d",
        tickValues: "every 2 months",
        legend: "Date",
        legendOffset: 41,
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: field,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={{ scheme: "purpleRed_green" }}
      pointSize={0}
      pointBorderWidth={2}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[]}
      enableSlices="x"
      sliceTooltip={({ slice }) => {
        return (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            <div>Date: {slice.points[0].data.x.toDateString()}</div>
            {slice.points.map((point) => (
              <div key={point.id}>
                {point.serieId}: {point.data.yFormatted}
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}
