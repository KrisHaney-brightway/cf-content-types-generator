"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v10Renderers = void 0;
const render_prop_any_1 = require("./render-prop-any");
const render_prop_array_1 = require("./render-prop-array");
const render_prop_link_1 = require("./render-prop-link");
const render_prop_resource_link_1 = require("./render-prop-resource-link");
const render_prop_richtext_1 = require("./render-prop-richtext");
exports.v10Renderers = {
    RichText: render_prop_richtext_1.renderRichTextV10,
    Link: render_prop_link_1.renderPropLinkV10,
    ResourceLink: render_prop_resource_link_1.renderPropResourceLinkV10,
    Array: render_prop_array_1.renderPropArrayV10,
    Text: render_prop_any_1.renderPropAnyV10,
    Symbol: render_prop_any_1.renderPropAnyV10,
    Object: render_prop_any_1.renderPropAnyV10,
    Date: render_prop_any_1.renderPropAnyV10,
    Number: render_prop_any_1.renderPropAnyV10,
    Integer: render_prop_any_1.renderPropAnyV10,
    Boolean: render_prop_any_1.renderPropAnyV10,
    Location: render_prop_any_1.renderPropAnyV10,
};
