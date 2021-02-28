$(function() {
  'use strict';

  var clearAnimation = function(){
    $('.animated').each(function(index,elem){ 
      var animateElemClass = $(elem).attr('class'); 
      if(animateElemClass.match(/trigger-(.+)/)){
        var animateEffectClass = animateElemClass.match(/trigger-(.+)/)[1]; 
        if(animateEffectClass){  
          $(elem).removeClass(animateEffectClass);
          $(elem).css('opacity','0');
        }
      }
    });
  };

  var fireAnimation = function(){
    $('.animated').each(function(index,elem){ 
      var animateElemClass = $(elem).attr('class'); 
	if(animateElemClass.match(/trigger-(.+)/)){
          var animateEffectClass = animateElemClass.match(/trigger-(.+)/)[1]; 
          var onScreenY = $(elem).offset().top - $(window).scrollTop();
          if(onScreenY >= 0 && onScreenY < $(window).height()*0.80){
            $(elem).addClass(animateEffectClass); 
            $(elem).css('opacity','1');
          }
  	}
    });
  };

  $(document).ready(function(){
    clearAnimation();
  });

  $(window).on('load scroll resize', function(){
    fireAnimation();
  });
});