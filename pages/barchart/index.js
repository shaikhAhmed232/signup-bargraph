import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "/styles/barchart.module.scss";
import * as d3 from "d3";
import { dataGenerator } from "../../js/dataGenerator";

const width = 800;
const height = 500;
const margins = { top: 20, bottom: 50, left: 50, right: 50 };

const innerWidth = width - margins.right - margins.left;
const innerHeight = height - margins.top - margins.bottom;

const xAxisThickDensity = 70;
const yAxisThickDensity = 70;

export default function BarChart({ data }) {
  const router = useRouter();
  const yRef = useRef();
  const xRef = useRef();

  const changeData = () => {
    router.push("/barchart");
  };

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, innerWidth])
    .padding(0.4);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.marks)])
    .range([innerHeight, 0]);

  useEffect(() => {
    const xAxisG = d3.select(xRef.current);
    const xAxis = d3.axisBottom(xScale).ticks(innerWidth / xAxisThickDensity);
    xAxisG.call(xAxis);

    const yAxisG = d3.select(yRef.current);
    const yAxis = d3.axisLeft(yScale).ticks(innerHeight / yAxisThickDensity);
    yAxisG.call(yAxis);
  }, [data]);

  return (
    <div className={styles.canvas}>
      <svg
        onClick={changeData}
        className={styles.canvas__svg}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
      >
        <g
          className={styles.svg__bar}
          transform={`translate(${margins.left}, ${margins.top})`}
        >
          {data.map((d, i) => {
            return (
              <>
                <rect
                  className={styles.bar__rect}
                  key={i}
                  x={xScale(d.name)}
                  y={innerHeight - yScale(d.marks)}
                  width={xScale.bandwidth()}
                  height={yScale(d.marks)}
                ></rect>
                <text
                  x={innerWidth / 2}
                  y={innerHeight + margins.bottom}
                  className="x__label"
                  fill="black"
                >
                  Students
                </text>
                <text
                  className="y__label"
                  fill="black"
                  x={-innerHeight / 2}
                  y={-40}
                  transform="rotate(-90)"
                >
                  Marks
                </text>
              </>
            );
          })}
          <g
            className={styles.x__axis}
            ref={xRef}
            transform={`translate(0, ${innerHeight})`}
          />
          <g className={styles.y__axis} ref={yRef} />
        </g>
      </svg>
    </div>
  );
}

export const getServerSideProps = async () => {
  const data = dataGenerator();

  return {
    props: {
      data,
    },
  };
};
