"use strict";

define(['js/Constants',
        'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants'], function (CONSTANTS,
                                                                                 DiagramDesignerWidgetConstants) {
 
    var CONTAINMENT_TYPE_LINE_END = "diamond-xwide-xlong",
        POINTER_TYPE_LINE_END = "classic-xwide-xlong",
        INHERITANCE_TYPE_LINE_END = "blockopen-xwide-xlong",
        POINTERLIST_TYPE_LINE_END = "classic-xwide-xlong",
        NO_END = "none";

    var _meta_relations = {
            CONTAINMENT : "containment",
            POINTER : "pointer",
            INHERITANCE : "inheritance",
            POINTERLIST : "pointerlist"
    };

    var _getLineVisualDescriptor = function (sName) {
        var params = {};

        params[DiagramDesignerWidgetConstants.LINE_WIDTH] = 2;
        params[DiagramDesignerWidgetConstants.LINE_START_ARROW] = NO_END;
        params[DiagramDesignerWidgetConstants.LINE_END_ARROW] = NO_END;
        params[DiagramDesignerWidgetConstants.LINE_COLOR] = "#AAAAAA";
        params[DiagramDesignerWidgetConstants.LINE_PATTERN] = DiagramDesignerWidgetConstants.LINE_PATTERNS.SOLID;

        switch (sName) {
            case _meta_relations.CONTAINMENT:
                params[DiagramDesignerWidgetConstants.LINE_START_ARROW] = CONTAINMENT_TYPE_LINE_END;
                params[DiagramDesignerWidgetConstants.LINE_END_ARROW] = NO_END;
                params[DiagramDesignerWidgetConstants.LINE_COLOR] = "#000000";
                break;
            case _meta_relations.POINTER:
                params[DiagramDesignerWidgetConstants.LINE_START_ARROW] = NO_END;
                params[DiagramDesignerWidgetConstants.LINE_END_ARROW] = POINTER_TYPE_LINE_END;
                params[DiagramDesignerWidgetConstants.LINE_COLOR] = "#0000FF";
                break;
            case _meta_relations.INHERITANCE:
                params[DiagramDesignerWidgetConstants.LINE_START_ARROW] = INHERITANCE_TYPE_LINE_END;
                params[DiagramDesignerWidgetConstants.LINE_END_ARROW] = NO_END;
                params[DiagramDesignerWidgetConstants.LINE_COLOR] = "#FF0000";
                break;
            case _meta_relations.POINTERLIST:
                params[DiagramDesignerWidgetConstants.LINE_START_ARROW] = NO_END;
                params[DiagramDesignerWidgetConstants.LINE_END_ARROW] = POINTERLIST_TYPE_LINE_END;
                params[DiagramDesignerWidgetConstants.LINE_COLOR] = "#AA03C3";
                params[DiagramDesignerWidgetConstants.LINE_PATTERN] = DiagramDesignerWidgetConstants.LINE_PATTERNS.DASH;
                break;
            default:
                break;
        }

        return params;
    };

    var _convertToButtonLineEndStyle = function (lineEndStyle) {
        return lineEndStyle.replace("xwide", "wide").replace("xlong", "long");
    };

    var _createButtonIcon = function (btnSize, connType) {
        var el = $('<div/>'),
            path,
            paper = Raphael(el[0], btnSize, btnSize),
            pathParams = _getLineVisualDescriptor(connType);

        pathParams[DiagramDesignerWidgetConstants.LINE_START_ARROW] = _convertToButtonLineEndStyle(pathParams[DiagramDesignerWidgetConstants.LINE_START_ARROW]);
        pathParams[DiagramDesignerWidgetConstants.LINE_END_ARROW] = _convertToButtonLineEndStyle(pathParams[DiagramDesignerWidgetConstants.LINE_END_ARROW]);

        el.attr({"style": "height: " + btnSize + "px; margin-top: 2px; margin-bottom: 2px;"});

        path = paper.path("M" + btnSize / 2 + ",0, L" + btnSize / 2 + "," + btnSize);

        path.attr({ "arrow-start": pathParams[DiagramDesignerWidgetConstants.LINE_START_ARROW],
            "arrow-end": pathParams[DiagramDesignerWidgetConstants.LINE_END_ARROW],
            "stroke":  pathParams[DiagramDesignerWidgetConstants.LINE_COLOR],
            "stroke-width": pathParams[DiagramDesignerWidgetConstants.LINE_WIDTH],
            "stroke-dasharray": pathParams[DiagramDesignerWidgetConstants.LINE_PATTERN]});

        return el;
    };

    return {
        META_RELATIONS: _meta_relations,

        getLineVisualDescriptor : _getLineVisualDescriptor,

        createButtonIcon : _createButtonIcon
    }
});