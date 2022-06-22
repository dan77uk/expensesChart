const result = [
  {
    "day": "mon",
    "amount": 17.45
  },
  {
    "day": "tue",
    "amount": 34.91
  },
  {
    "day": "wed",
    "amount": 52.36
  },
  {
    "day": "thu",
    "amount": 31.07
  },
  {
    "day": "fri",
    "amount": 23.39
  },
  {
    "day": "sat",
    "amount": 43.28
  },
  {
    "day": "sun",
    "amount": 25.48
  }
]

let days = []
result.forEach(day => { days.push(day.day) })

let amounts = []
result.forEach(day => { amounts.push(day.amount) })

Chart.defaults.font.size = 16;

// <block:external:2>
const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'hsl(25, 47%, 15%)';
    tooltipEl.style.borderRadius = '10px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.margin = '-50px 0 0 0';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('div');

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const {chart, tooltip} = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    // const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(b => b.lines);
    const value = `$${bodyLines[0][0]}`

    const insertValue = document.createElement('p')
    insertValue.innerText = value
    const tableRoot = tooltipEl.querySelector('div');
    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }
    tableRoot.appendChild(insertValue);
  }

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = '10px 15px'

};
// </block:external>

const config = {
  type: 'bar',
  data: {
    datasets: [{
      data: amounts,
    }],
    labels: days
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    borderRadius: 5,
    backgroundColor: 'hsl(10, 79%, 65%)',
    hoverBackgroundColor: 'hsl(186, 34%, 60%)',
    scales: {
      y: {
        display: false,
      },
      x: {
        grid: {display: false},
      },
    },
    plugins: {
      legend: {display: false},
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
      }
    },
  }
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);


