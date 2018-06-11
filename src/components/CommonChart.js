import React, { Component } from 'react';
import Chart from 'chart.js';
import './ChartCommon.css'

class LineChart extends Component {
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
    const { chartType, chartData, chartDataProps, chartOptions } = this.props;
    this.chartData = {
      type: chartType,
      data: chartDataProps,
      options: chartOptions(self)
    }
    if (Array.isArray(chartData)) {
      chartData.map((d, idx) => {
        this.chartData.data.dataset[idx].data = d.value
      })
    }
    /*
     * Component DOM mount 완료 후 최초 차트 생성 지점
     */
    this.chart = new Chart(this.ctx, this.chartData);
  }

  componentWillUnmount() {
    /* 컴포넌트 Unmount 시 차트 삭제
     *
     */
    this.chart.destroy();
  }

  /* componentWillReceiveProps 단계에서 비교를 위해 data 두 개를 받아서 확인
   * length - key - value 순으로 진행한다
   */
  compareData = (prevData, nextData) => {
    if (prevData.length !== nextData.length) {
      return false
    }
    for ( let i = 0; i < nextData.length; i++) {
      if (prevData[i].key !== nextData[i].key) {
        return false
      } else if (prevData[i].value.length !== nextData[i].value.length) {
        return false
      }
      for ( let j = 0; j < nextData[i].value.length; j++) {
        if (prevData[i].value[j] !== nextData[i].value[j]) {
          return false
        }
      }
    }
    return true
  }

  componentWillReceiveProps(nextProps) {
    if (!this.compareData(this.props.chartData, nextProps.chartData)) {
      nextProps.chartData.map((d, idx) => {
        this.chartData.data.datasets[idx].data = d.value;
      })
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

export default LineChart;