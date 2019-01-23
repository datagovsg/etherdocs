var eejs = require('ep_etherpad-lite/node/eejs/');

exports.eejsBlock_mySettings = function (hook_name, args, cb)
{
  args.content = args.content + eejs.require('ep_user_font_size/templates/user_font_sizeSettings.ejs', {settings : false});
  return cb();
}
