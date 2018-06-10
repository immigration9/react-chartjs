
const drawTooltipCircle = (color) => {
  let circle = `<svg height="10" width="10">`
  circle += `<circle cx="5" cy="5" r="5" fill="${color}" />`
  circle += `</svg>`
  return circle
}

export const barChartDataProps = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [{
    label: '# of People',
    backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
}

export const lineChartDataProps = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    label: '# of Men',
    borderColor: 'rgba(54, 162, 235, 1)',
    backgroundColor: 'rgba(0,0,0,0)',
  }, {
    label: '# of Women',
    borderColor: 'rgba(255,99,132,1)',
    backgroundColor: 'rgba(0,0,0,0)',
  }]
}

export const barChartOptions = (self) => ({
  tooltips: {
    enabled: false,
    custom: (tooltipModel) => {
      // Tooltip Element
      let tooltipEl = document.getElementById('chartjs-tooltip');

      /* Create element on first render
       * 최초 생성시 tooltipEl 생성 후 attach
       */ 
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = "<table></table>";
        document.body.appendChild(tooltipEl);
      }

      // Hide if no tooltip
      if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set caret Position
      tooltipEl.classList.remove('above', 'below', 'no-transform');
      if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
      } else {
        tooltipEl.classList.add('no-transform');
      }

      const getBody = (bodyItem) => {
        return bodyItem.lines;
      }

      // Set Text
      if (tooltipModel.body) {
        /* Title Line: 현재 tooltip이 작성될 항목의 이름
         * Body Line: 현재 tooltip에 작성될 항목의 내용
         */
        let titleLines = tooltipModel.title || [];
        let bodyLines = tooltipModel.body.map(getBody);

        let innerHtml = '<thead>';

        titleLines.forEach(function(title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
        });
        innerHtml += '</thead><tbody>';

        /* Body Line에 해당하는 내용마다 (차트에 항목이 여러개 있을 경우))
         * 어떤 식으로 내용이 들어갈지에 대한 항목
         */
        bodyLines.forEach(function(body, i) {
            let colors = tooltipModel.labelColors[i];
            let style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            let span = '<span style="' + style + '"></span>';
            innerHtml += '<tr><td>';
            innerHtml += drawTooltipCircle(colors.borderColor);
            innerHtml += span + ' ' + body + '</td></tr>';
        });
        innerHtml += '</tbody>';

        let tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
      }

      /* `this` will be the overall tooltip
       * Canvas 상에서 위치 지정
       */
      let position = self.canvas.getBoundingClientRect();

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
      tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
      tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
      tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
      tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
      tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
    }
  }
})

export const lineChartOptions = (self) => ({
  scales: {
    xAxes: [{
      border: {
        display: true,
        color: '#000'
      },
      gridLines: {
        zeroLineColor: 'green'
      }
    }],
    yAxes: [{
      gridLines: {
        zeroLineColor: '#000'
      }
    }]
  }
})