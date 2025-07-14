import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { GetApiCall } from '../../ApiCall';

const size = {
  width: 250,
  height: 250,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 16,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChart123() {
  const [projectProgress, setProjectProgress] = useState({});

  const getProjectProgressApiCall = async () => {
    const data = await GetApiCall("project_progress"); // Await needed
    console.log("projectProgress data::", data);

    if (data.data.success === true) {
      setProjectProgress(data.data);
    }
  };

  console.log("projectProgress::", projectProgress);

  useEffect(() => {
    getProjectProgressApiCall();
  }, []);

  const pieData = [
    {
      value: projectProgress.CompletedProjects,
      label: projectProgress.CompletedProjects + " Completed "+`(${projectProgress.CompletedHour} Hours)`,
    },
    {
      value: projectProgress.inProgressProjects,
      label: projectProgress.inProgressProjects + " In Progress" +`(${projectProgress.inProgressHour} Hours)`,
    },
    {
      value: projectProgress.yetToStartProjects,
      label: projectProgress.yetToStartProjects + " Yet to Start"+`(${projectProgress.YeToStartHour} Hours)`,
    },
  ];

  return (
    <PieChart series={[{ data: pieData, innerRadius: 95 }]} {...size}>
      <PieCenterLabel>Total Project  {projectProgress.totalProjects}</PieCenterLabel>
    </PieChart>
  );
}
