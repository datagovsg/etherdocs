exports.postAceInit = function(name, context){
  var padOuter = $('iframe[name="ace_outer"]').contents();
  var padInner = padOuter.find('iframe[name="ace_inner"]');

  $('#user-font-size').change(function(){
    var newVal = 20 + parseInt($(this).val()) +"%";

    // line-height behaves weird, can't really solve it easily.
    // For now this bodge fix will do
    padInner.contents().find("body").css("line-height", newVal);
    padInner.contents().find("body").css("font-size", newVal);
  });
}

