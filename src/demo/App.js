import React, { Component } from 'react';
import './App.css';
// import AreaChart from './components/AreaChart';
import BarChart from '../components/BarChart';
import * as ChartMeta from '../components/DefaultMeta';
import CommonChart from '../components/CommonChart';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barChartData: [],
      lineChartData: [],
    }
  }

  componentDidMount() {
    // Generate Chart data
    this.genBarChartData();
    this.genLineChartData();

    // Generate Chart data every 5 seconds.
    setInterval(this.genBarChartData, 5000);
    setInterval(this.genLineChartData, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.genBarChartData);
    clearInterval(this.genLineChartData);
  }
  
  getRand = () => {
    return Number(Math.random() * 10).toFixed(1);
  }

  genBarChartData = () => {
    let chartData = [];
    for ( let i = 0; i < 6; i++ ) {
      chartData.push(this.getRand());
    }
    this.setState({
      barChartData: chartData
    })
  }

  /* CommonChart로 차트를 만든 경우, 반드시 dataset당 JS 객체 한개를 생성해야 한다.
   * 각각의 JS 객체는 key, value로 이루어진 값을 가져야 한다.
   * ex) 강아지, 고양이로 만들 경우 [{key: 'dogs', value: []}, {key: 'cats', value: []}]
   */
  genLineChartData = () => {
    let chartData = [{key: 'men', value: []}, {key: 'women', value: []}];
    for ( let i = 0; i < 12; i++ ) {
      chartData[0].value.push(this.getRand());
      chartData[1].value.push(this.getRand());
    }
    this.setState({
      lineChartData: chartData
    })
  }

  render() {
    return (
      <div className="App">
        <BarChart 
          width={800} height={400} units="px"
          chartData={this.state.barChartData} 
          chartDataProps={ChartMeta.barChartDataProps}
          chartOptions={ChartMeta.barChartOptions}/>
        <CommonChart
          width={800} height={400} units="px"
          chartType="line"
          chartData={this.state.lineChartData} 
          chartDataProps={ChartMeta.lineChartDataProps}
          chartOptions={ChartMeta.lineChartOptions}/>
      </div>
    );
  }
}

export default App;
