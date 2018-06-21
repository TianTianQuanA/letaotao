



//设置轮播图的循环播放
  mui('.mui-slider').slider({
  interval:4000//自动轮播周期，若为0则不自动播放，默认为0；
});


//必须先初始化一次

mui('.mui-scroll-wrapper').scroll({
  indicators:false
});