import { Card } from '@nextui-org/react';
import { AgChartOptions } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-react';
import dayjs from 'dayjs';
import { useState } from 'react';

const TemperatureChart = ({
  data,
  timeUnit,
  temperatureUnit,
}: {
  data: {
    temperature: number;
    time: string;
  }[];
  timeUnit: string;
  temperatureUnit: string;
}) => {
  const [options, setOptions] = useState<AgChartOptions>({
    data,
    series: [
      {
        type: 'line',
        xKey: 'time',
        yKey: 'temperature',
        interpolation: { type: 'smooth' },
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          formatter: ({ value }) => dayjs(value).format('HH:mm'),
        },
      },
      {
        type: 'number',
        position: 'left',
        label: {
          formatter: (params) => `${params.value}${temperatureUnit}`,
        },
      },
    ],
  });

  return (
    <Card>
      <AgCharts options={options} />
    </Card>
  );
};

export default TemperatureChart;
