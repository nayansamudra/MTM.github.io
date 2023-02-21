Chart.defaults.NegativeTransparentLine = Chart.helpers.clone(Chart.defaults.line);
Chart.controllers.NegativeTransparentLine = Chart.controllers.line.extend({
    update: function () {
        // get the min and max values
        var min = Math.min.apply(null, this.chart.data.datasets[0].data);
        var max = Math.max.apply(null, this.chart.data.datasets[0].data);
        yScale = this.getScaleForId(this.getDataset().yAxisID);
        console.log(yScale)

        // figure out the pixels for these and the value 0
        var top = yScale.getPixelForValue(max);
        var zero = yScale.getPixelForValue(0);
        var bottom = yScale.getPixelForValue(min);

        // build a gradient that switches color at the 0 point
        var ctx = this.chart.chart.ctx;
        var gradient = ctx.createLinearGradient(0, top, 0, bottom);
        var ratio = Math.min((zero - top) / (bottom - top), 1);
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(ratio, 'green');
        gradient.addColorStop(ratio, 'red');
        gradient.addColorStop(1, 'red');
        this.chart.data.datasets[0].backgroundColor = gradient;

        return Chart.controllers.line.prototype.update.apply(this, arguments);
    }
});

var ctx = document.getElementById("myChart").getContext("2d");

var myLineChart = new Chart(ctx, {
    type: 'NegativeTransparentLine',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            strokeColor: "rgba(60,91,87,1)",
            pointColor: "rgba(60,91,87,1)",
            pointStrokeColor: "#58606d",
            data: [65, -58, 65, -10, 56, -55, 40],
        }]
    }
});