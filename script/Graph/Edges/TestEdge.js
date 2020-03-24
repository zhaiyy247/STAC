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

    const R = VIEWS.SharedFunctionality.R;
    NETWORK.GRAPH.TestEdges.prototype.decorateEdges = function (svg, edgesData) {

        this.gCenter = svg.selectAll(".edgeCentre1").data(["1"]).enter().append("g");

        this.wrapperLine = this.gCenter.selectAll(".edgeCentre1").data(this.data).enter().append("line").attr({
            "class": "edgeDecorator",
            "x1": R / 2,
            "x2": R / 2,
            "y1": -R / 2,
            "y2": R / 2,
        });

        this.wrapperPoly = this.gCenter.selectAll(".edgeCentre1").data(this.data).enter().append("polygon").attr({
            "class": "edgeDecorator testEdge",
            "points": `${-R / 2},${-R / 2} ${-R / 2},${R / 2} ${R / 2},0`,
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
        // console.log(svg.selectAll(".testEdge")[0]);
    };

    NETWORK.GRAPH.TestEdges.prototype.moveDecorator = function () {

        this.wrapperLine.each(function (d) {
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

            let angle = Math.atan((y2 - y1) / (x2 - x1)) * 180 / Math.PI;
            let delX = (x1 + x2) / 2;
            let delY = (y1 + y2) / 2;

            d3.select(this).attr({
                "transform": "translate(" + delX + ", " + delY + ") rotate(" + angle + ")",
            });
        });

        this.wrapperPoly.each(function (d) {
            var x1, y1, x2, y2;
            var polyPoints = this.points;
            let newArr = Array.from(polyPoints);
            let newPoints = '';

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

            let angle = Math.atan((y2 - y1) / (x2 - x1)) * 180 / Math.PI;
            let delX = (x1 + x2) / 2;
            let delY = (y1 + y2) / 2;

            // if (polyPoints != null) {
            //     newPoints = `${newArr[0].x + x},${newArr[0].y + y} ${newArr[1].x + x},${newArr[1].y + y} ${newArr[2].x + x},${newArr[2].y + y}`;
            // }

            d3.select(this).attr({
                "transform": "translate(" + delX + ", " + delY + ") rotate(" + angle + ")",
            });

        })
    };
})(NETWORK.GRAPH || (NETWORK.GRAPH = {}));