(function () {
    NETWORK.GRAPH.TestEdges = function (svg, edgesData) {
        NETWORK.GRAPH.Edges.call(this, svg, edgesData);
        this.edges.on("mouseover", function (d) {
            var warningData = d.validationWarning;
            var errorData = d.validationError;
            var bWarning = d.warning;
            var bError = d.error;
            var TooltipData;
            if (bError && bWarning) {
                TooltipData = NETWORK.RULES.transformerEdgeToolTipExtra.concat(errorData);
            } else if (bError) {
                TooltipData = NETWORK.RULES.transformerEdgeToolTipExtra.concat(errorData);
            } else if (bWarning) {
                TooltipData = warningData.concat(NETWORK.RULES.transformerEdgeToolTipExtra);
            } else {
                TooltipData = NETWORK.RULES.edgeToolTip.concat(NETWORK.RULES.transformerEdgeToolTipExtra);
            }
            NETWORK.TOOLTIP.showToolTip(d, d3.event, TooltipData);
        });
    };
    NETWORK.GRAPH.TestEdges.prototype = Object.create(NETWORK.GRAPH.Edges.prototype);
    NETWORK.GRAPH.TestEdges.prototype.consructor = NETWORK.GRAPH.TestEdges;

    NETWORK.GRAPH.TestEdges.prototype.decorateEdges = function (svg, edgesData) {
        this.gCenter = svg.selectAll(".edgeCentre1").data(["1"]).enter().append("g");

        this.wrapperRect = this.gCenter.selectAll(".edgeCentre1").data(this.data).enter().append("rect").attr({
            "class": "edgeDecorator",
            "height": 2 * VIEWS.SharedFunctionality.R / 3,
            "width": 4 * VIEWS.SharedFunctionality.R / 3,
            "rx": VIEWS.SharedFunctionality.R / 3,
            "ry": VIEWS.SharedFunctionality.R / 3,
        })
            .classed("OffStatus", function (d) {
                if (parseInt(d.edgeData.status) === 0) {
                    return true;
                }
            })
            .on("mouseover", function (d) {
                var warningData = d.validationWarning;
                var errorData = d.validationError;
                var bWarning = d.warning;
                var bError = d.error;
                var TooltipData;
                if (bError && bWarning) {
                    TooltipData = errorData;
                } else if (bError) {
                    TooltipData = errorData;
                } else if (bWarning) {
                    TooltipData = warningData;
                } else {
                    TooltipData = NETWORK.RULES.edgeToolTip;
                }
                NETWORK.TOOLTIP.showToolTip(d, d3.event, TooltipData);
            })
            .on("mouseout", function (d) {
                NETWORK.TOOLTIP.hideToolTip(d);
            });
    };

    NETWORK.GRAPH.TestEdges.prototype.moveDecorator = function () {
        this.wrapperRect.each(function (d) {
            var x1, y1, x2, y2;
            if (typeof d.x1 !== "undefined") {
                x1 = d.x1;
                x2 = d.x2;
                y1 = d.y1;
                y2 = d.y2;
            } else {
                x1 = d.source.x;
                x2 = d.target.x;
                y1 = d.source.y;
                y2 = d.target.y;
            }
            var x = (x1 + x2) / 2 - VIEWS.SharedFunctionality.R * .75;
            var y = (y1 + y2) / 2 - VIEWS.SharedFunctionality.R * .3;
            d3.select(this).attr({
                "x": x,
                "y": y,
                "transform": "rotate(" + (Math.atan((y2 - y1) / (x2 - x1)) * 180 / Math.PI) + "," + ((x1 + x2) / 2) + "," + ((y1 + y2) / 2) + ")"
            });

        });
    };
})(NETWORK.GRAPH || (NETWORK.GRAPH = {}));