# React + ChartJS (Not to be confused with the preexisting react-chartjs library)
ChartJS React 사용시 활용 가이드라인
Reference: 
Docs: http://www.chartjs.org/docs/latest/

## Getting Started
```shell
yarn install
yarn start
```

## Chart 생성시 옵션
* 구현시 Demo에 import 하여 생성 `CommonChart.js`
* Chart에서 필요로 하는 항목은 아래 세가지
    1. Chart Data Props: data 항목에 들어가는 옵션들
    2. Chart Options: 이외의 차트 옵션들
    3. Chart Data: 실질적으로 그려지는 데이터
* 관련된 세부 주석은 `components/BarChart.js` 파일을 참조
