exports.collectContentPre = function(hook, context){
  var tname = context.tname;
  var state = context.state;
  var lineAttributes = state.lineAttributes
  var tagIndex = tname;
  if(tname == "sub"){
    context.cc.doAttrib(state, "sub");
  }
  if(tname == "sup"){
    context.cc.doAttrib(state, "sup");
  }
};

exports.collectContentPost = function(hook, context){
  var tname = context.tname;
  var state = context.state;
  var lineAttributes = state.lineAttributes

  if(tname >= 0){
    delete lineAttributes['sub'];
  }
  if(tname >= 0){
    delete lineAttributes['sup'];
  }
};
