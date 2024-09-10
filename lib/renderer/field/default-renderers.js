"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRenderers = void 0;
const render_prop_any_1 = require("./render-prop-any");
const render_prop_array_1 = require("./render-prop-array");
const render_prop_link_1 = require("./render-prop-link");
const render_prop_resource_link_1 = require("./render-prop-resource-link");
const render_prop_richtext_1 = require("./render-prop-richtext");
exports.defaultRenderers = {
    RichText: render_prop_richtext_1.renderRichText,
    Link: render_prop_link_1.renderPropLink,
    ResourceLink: render_prop_resource_link_1.renderPropResourceLink,
    Array: render_prop_array_1.renderPropArray,
    Text: render_prop_any_1.renderPropAny,
    Symbol: render_prop_any_1.renderPropAny,
    Object: render_prop_any_1.renderPropAny,
    Date: render_prop_any_1.renderPropAny,
    Number: render_prop_any_1.renderPropAny,
    Integer: render_prop_any_1.renderPropAny,
    Boolean: render_prop_any_1.renderPropAny,
    Location: render_prop_any_1.renderPropAny,
};
