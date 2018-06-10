import React, { Component } from 'react';
import Chart from 'chart.js';

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.initCanvas = element => {
      this.canvas = element;
      this.ctx = this.canvas.getContext('2d');
    }

    this.chartData = {};
    this.chartDataCombinator();
  }

  componentDidMount() {
    this.chart = new Chart(this.ctx, this.chartData);

    this.chartDataUpdate();

    setInterval(this.chartDataUpdate, 5000);
  }

  getRand = () => {
    return Math.random() * 10
  }

  chartDataUpdate = () => {
    this.chartData.data.datasets[0].data = [
      this.getRand(),
      this.getRand(), 
      this.getRand(), 
      this.getRand(), 
      this.getRand(), 
      this.getRand(), 
    ]

    // Update Chart
    this.chart.update(this.chartData);
    
  }

  chartDataCombinator = () => {
    this.chartData.type = 'bar';
    this.chartData.data = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
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
  }
  
  componentWillReceiveProps(nextProps) {

  }
  
  render() {
    const { width, height } = this.props;
    return (
      <div style={{width: '600px', height: '600px'}}>
        <canvas 
          ref={this.initCanvas}
          id="myChart"
          width="300"
          height="300"
        />
      </div>
    );
  }
}

export default BarChart;