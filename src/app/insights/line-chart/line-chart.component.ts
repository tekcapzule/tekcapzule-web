import { Component, ElementRef, OnInit } from '@angular/core';

import * as d3 from 'd3'
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { WeatherData } from './data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  
  weatherData = WeatherData;
  public activeField: number;
  public dataFields: string[] = ['Temperature', 'Dewpoint', 'Visibility'];
  public chartData: any;
  private host: any;
  private svg: any;
  private htmlElement: HTMLElement;
  public data: number[] = [];

  private margin = { top: 10, right: 10, bottom: 15, left: 25 };
  public width: number;
  public height: number;
  private x: any;
  private y: any;
  private line: d3Shape.Line<[number, number]>; // this is line definition

  constructor(public elRef: ElementRef) {
    this.htmlElement = this.elRef.nativeElement;
    this.chartData = {data: [], locationName: ''};
    this.activeField = 0;
  }

  ngOnInit(): void {
    console.log('LineChartComponent:ngOnInit');
    this.setup();
    this.updateGraphData();
  }

  private setup(): void {
    console.log('LineChartComponent:setup');
    this.chartData.data = this.weatherData.observations;
    this.chartData.locationName = this.weatherData.locationName.toLocaleUpperCase(); 
    this.buildSvg();
  }

  /**
   * Configures the SVG element
   */
  private buildSvg(): void {
    console.log('LineChartComponent:buildSvg');
    this.host = d3.select(this.htmlElement);
    let svgElement: any = this.htmlElement.getElementsByClassName('svg-chart')[0];
    
    // Do some automatic scaling for the chart
    this.width = svgElement.clientWidth - this.margin.left - this.margin.right;
    this.height = svgElement.clientHeight * 0.90 - this.margin.top - this.margin.bottom;
    this.svg = this.host.select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.svg
      .append("text")
      .attr("y", "50%") // set the location of the text with respect to the y-axis
      .attr("x", "40%") // set the location of the text with respect to the x-axis
      .style("fill", "#0000AA") // set the font color
      .style("font-size", "2.3em")
      .style("font-weight", "bold")
      .attr("alignment-baseline", "middle")
      .attr("text-anchor", "middle")
  }

  /**
   * Execute the methods necessary to update the graph with 
   * the data retrieved from the JSON file
   * @param obsData
   */
  public updateGraphData(): void {
    console.log('LineChartComponent:updateGraphData');
    // Iterate to the next set of available data
    this.activeField++;
    if (this.activeField >= this.dataFields.length){
      this.activeField = 0;
    }

    // Remove the current line form the chart
    this.clearChartData();
    
    // Build the data array for chart where the values of 
    // interest are put date and value fields
    this.data = this.buildChartData();

    // Configuring line path
    this.configureXaxis();
    this.configureYaxis();

    // Create the line for the chart and add it 
    this.drawLineAndPath();
  }

  /**
   * Removes all lines and axis from the chart so we can
   * create new ones based on the data
   */
  private clearChartData(): void {
    if (this.chartData !== null
      && this.chartData.data.length > 0) {
      this.svg.selectAll('g').remove();
      this.svg.selectAll('path').remove();
    }
  }
  
/**
   * Creates the chart data array by selecting the
   * appropriate data based on the user selection
   * Returns an array of objects with a date and 
   * value property
   */
  private buildChartData(): any[] {
    console.log('LineChartComponent:buildChartData');
    let data: any = [];
    if (this.chartData != null
      && this.chartData.data != null) {
      let value: any = null;

      // Extract the desired data from the JSON object
      this.chartData.data.forEach((d) => {
        if (this.activeField === 0){
          value = d.temperature;
        }
        else if (this.activeField === 1){
          value = d.dewpoint;
        }
        else if (this.activeField === 2){
          value = d.visibility;
        }

        if (value !== null) {
          data.push(
            {
              date: new Date(d.time),
              value: value
            });
        }
      });
    }

    return data;
  }
  
  /**
   * Configures the Y-axis based on the data values
   */
  private configureYaxis(): void {
    // range of data configuring
    let yRange: any[] = d3Array.extent(this.data, (d) => d['value']);
    // If we have data then make the Y range one less than the
    // smallest value so we have space between the bottom-most part
    // of the line and the X-axis
    if (yRange && yRange.length > 1
      && yRange[0] !== yRange[yRange.length - 1]) {
      yRange[0] -= 1;
    }
    this.y = d3Scale.scaleLinear()
      .range([this.height, 0])
      .domain(yRange);

    // Add the Y-axis definition to the left part of the chart
    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y));

  }

  /**
   * Configures the X-axis based on the time series
   */
  private configureXaxis(): void {
    console.log('LineChartComponent:configureXaxis');
    // range of data configuring, in this case we are
    // showing data over a period of time
    this.x = d3Scale.scaleTime()
      .range([0, this.width])
      .domain(d3Array.extent(this.data, (d) => d['date']));

    // Add the X-axis definition to the bottom of the chart
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

  }

  /**
   * Configures and draws the line on the graph
   */
  private drawLineAndPath() {
    console.log('LineChartComponent:drawLineAndPath');
    // Create a line based on the X and Y values (date and value)
    // from the data
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));

    // Configure the line's look and data source
    this.svg.append('path')
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", this.line);
  }


}
