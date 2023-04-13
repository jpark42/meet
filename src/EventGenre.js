import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];

      const data = genres.map((genre) => {
        const value = events.filter((event) =>
          event.summary.split(" ").includes(genre)
        ).length;
        return { name: genre, value };
      });
      return data;
    };
    setData(() => getData());
  }, [events]);

  /*const data = [
        {name: 'Group A', value: 400 },
        {name: 'Group B', value: 300 },
        {name: 'Group C', value: 300 },
        {name: 'Group D', value: 200 }
    ];
    */
  const colors = ["#0040ff", "#9933ff", "#cc3399", "#2d2d86", "#006080"];

  return (
    <ResponsiveContainer height={400}>
      <PieChart
        margin={{
          top: 0,
          right: 0,
          bottom: 50,
          left: 0,
        }}
      >
        <Pie
          data={data}
          cx="auto"
          cy="auto"
          labelLine={false}
          label={({ percent }) => ` ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={50} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
