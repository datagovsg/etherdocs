var eejs = require('ep_etherpad-lite/node/eejs/');
exports.eejsBlock_editbarMenuRight = function (hook_name, args, cb) {
    args.content = eejs.require('ep_countable/templates/barButton.ejs') + args.content;
    return cb();
}
exports.eejsBlock_afterEditbar = function (hook_name, args, cb) {
    args.content = args.content + eejs.require('ep_countable/templates/afterEditbar.ejs');
    return cb();
}
exports.eejsBlock_styles = function (hook, context) {
    context.content = context.content + '<link rel="stylesheet" type="text/css" href="../static/plugins/ep_countable/static/css/countable.css"></link>';
}
