(function(window, React, $) {
  var xChart = React.createClass({
    displayName: 'xChart',

    getDefaultProps: function() {
      return {
        type: 'line-dotted',
        data: {},
        xScale: 'ordinal',
        yScale: 'linear',
        className: '',
        options: {
          tickHintX: 5,
        },
        figureStyle: {
          width: '100%',
          height: '400px'
        }
      };
    },

    componentDidMount: function() {
      var data = {
        xScale: this.props.xScale,
        yScale: this.props.yScale,
        main: [{
          className: this.props.className,
          data: this.props.data
        }]
      };
      var tip = $('<div/>').css('position', 'absolute');
      $(this.refs.tip.getDOMNode()).append(tip);

      var options = _.extend(this.props.options, {
        mouseover: function (data, i) {
          var pos = $(this).offset();
          tip.tooltip({
            title: (data.x + ', ' + data.y),
            trigger: 'manual'
          }).css(pos).tooltip('show');
        },
        mouseout: function (x) {
          tip.tooltip('hide');
        }
      });
      this.chart = new xxChart(this.props.type, data, '#xchart' + this.props.id, options);
    },

    render: function() {
      var id = "xchart" + this.props.id;
      return (
        React.createElement("div", {style: this.props.figureStyle}, 
          React.createElement("div", {ref: "tip"}), 
          React.createElement("figure", {style: this.props.figureStyle, id: id})
        )
      );
    }
  });

  if (typeof module === 'undefined') {
    window.xChart = xChart;
  } else {
    require('xchart');
    module.exports = xChart;
  }
})(
  window,
  typeof require === 'function' ? require('react') : React,
  jQuery
);

