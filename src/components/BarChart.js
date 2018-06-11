import React, { Component } from 'react';
import Chart from 'chart.js';
import './ChartCommon.css'

class BarChart extends Component {
  constructor(props) {
    super(props);

    /*
     * Canvas Initialization
     */
    this.initCanvas = element => {
      this.canvas = element;
      this.ctx = this.canvas.getContext('2d');
    }

    /* Chart Data 전반이 모두 포함되는 항목
     * http://www.chartjs.org/docs/latest/ 에 있는 'Creating a Chart' 항목 참조
     */
    this.chartData = {};
  }

  componentDidMount() {
    let self = this;
    const { chartData, chartDataProps, chartOptions } = this.props;
    this.chartData = {
      type: "bar",
      data: chartDataProps,
      options: chartOptions(self)
    }
    if (Array.isArray(chartData)) {
      this.chartData.data.datasets[0].data = chartData
    }
    /*
     * Component DOM mount 완료 후 최초 차트 생성 지점
     */
    this.chart = new Chart(this.ctx, this.chartData);
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  compareData = (prevData, nextData) => {
    if (prevData.length !== nextData.length) {
      return false
    }
    for ( let i = 0; i < prevData.length; i++) {
      if (prevData[i] !== nextData[i]) {
        return false
      }
    }
    return true
  }

  componentWillReceiveProps(nextProps) {
    if (!this.compareData(this.props.chartData, nextProps.chartData)) {
      this.chartData.data.datasets[0].data = nextProps.chartData
      this.chart.update();
    }
  }
  
  render() {
    const { width, height, units } = this.props;
    return (
      /* Chartjs Library 사용시 Canvas를 직접적으로 조작하는 것은 권장되지 않는다.
       * 컴포넌트의 컨테이너(div)로 감싸준 뒤 해당 값을 조정하는 것이 낫다
       * Units라는 별도의 항목을 두어 px, vh, % 중 선택할 수 있도록 한다.
       */
      <div style={{width: width + units, height: height + units}}>
        <canvas 
          ref={this.initCanvas}
          id="myChart"
        />
      </div>
    );
  }
}

export default BarChart;