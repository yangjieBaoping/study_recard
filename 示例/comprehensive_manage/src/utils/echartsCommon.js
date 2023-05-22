// echarts公共组件
import * as echarts from "echarts";
import 'echarts/extension/bmap/bmap';
import { LinesChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([LinesChart, CanvasRenderer]);
export function getPie(value) {
  var myChart = echarts.init(value);
  var option;

  option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };

  option && myChart.setOption(option);
  window.onresize = myChart.resize;
}

export function getLine(value) {
  var myChart = echarts.init(value);
  var option;

  option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };

  option && myChart.setOption(option);
  window.onresize = myChart.resize;
}


export function getData (value) {
  
  echarts.use([LinesChart, CanvasRenderer]);
  
  var ROOT_PATH = 'https://echarts.apache.org/examples';
  var app = {};

  var myChart = echarts.init(value);
  var option;
  
  $.get(ROOT_PATH + '/data/asset/data/lines-bus.json', function (data) {
    let hStep = 300 / (data.length - 1);
    let busLines = [].concat.apply(
      [],
      data.map(function (busLine, idx) {
        let prevPt = [];
        let points = [];
        for (let i = 0; i < busLine.length; i += 2) {
          let pt = [busLine[i], busLine[i + 1]];
          if (i > 0) {
            pt = [prevPt[0] + pt[0], prevPt[1] + pt[1]];
          }
          prevPt = pt;
          points.push([pt[0] / 1e4, pt[1] / 1e4]);
        }
        return {
          coords: points,
          lineStyle: {
            normal: {
              color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
            }
          }
        };
      })
    );
    myChart.setOption(
      (option = {
        bmap: {
          center: [116.46, 39.92],
          zoom: 10,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: 'water',
                elementType: 'all',
                stylers: {
                  color: '#031628'
                }
              },
              {
                featureType: 'land',
                elementType: 'geometry',
                stylers: {
                  color: '#000102'
                }
              },
              {
                featureType: 'highway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#000000'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry.stroke',
                stylers: {
                  color: '#0b3d51'
                }
              },
              {
                featureType: 'local',
                elementType: 'geometry',
                stylers: {
                  color: '#000000'
                }
              },
              {
                featureType: 'railway',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#000000'
                }
              },
              {
                featureType: 'railway',
                elementType: 'geometry.stroke',
                stylers: {
                  color: '#08304b'
                }
              },
              {
                featureType: 'subway',
                elementType: 'geometry',
                stylers: {
                  lightness: -70
                }
              },
              {
                featureType: 'building',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#000000'
                }
              },
              {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: {
                  color: '#857f7f'
                }
              },
              {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: {
                  color: '#000000'
                }
              },
              {
                featureType: 'building',
                elementType: 'geometry',
                stylers: {
                  color: '#022338'
                }
              },
              {
                featureType: 'green',
                elementType: 'geometry',
                stylers: {
                  color: '#062032'
                }
              },
              {
                featureType: 'boundary',
                elementType: 'all',
                stylers: {
                  color: '#465b6c'
                }
              },
              {
                featureType: 'manmade',
                elementType: 'all',
                stylers: {
                  color: '#022338'
                }
              },
              {
                featureType: 'label',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              }
            ]
          }
        },
        series: [
          {
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: busLines,
            silent: true,
            lineStyle: {
              // color: '#c23531',
              // color: 'rgb(200, 35, 45)',
              opacity: 0.2,
              width: 1
            },
            progressiveThreshold: 500,
            progressive: 200
          },
          {
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: busLines,
            lineStyle: {
              width: 0
            },
            effect: {
              constantSpeed: 20,
              show: true,
              trailLength: 0.1,
              symbolSize: 1.5
            },
            zlevel: 1
          }
        ]
      })
    );
  });
  
  option && myChart.setOption(option);
}