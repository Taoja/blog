(function($) {
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function() {
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback) {
    setTimeout(function() {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function() {
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function() {
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function() {
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  /*$('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
			'<a href="http://tieba.baidu.com/f/commit/share/openShareApi?url=' + encodedUrl + '" class="article-share-tieba" target="_blank" title="百度贴吧"></a>',
			'<a href="http://service.weibo.com/share/share.php?url=' + encodedUrl + '" class="article-share-weibo" target="_blank" title="新浪微博"></a>',
			'<a href="http://share.v.t.qq.com/index.php?c=share&a=index&url=' + encodedUrl + '" class="article-share-tqq" target="_blank" title="腾讯微博"></a>',
			'<a href="http://widget.renren.com/dialog/share?resourceUrl=' + encodedUrl + '" class="article-share-renren" target="_blank" title="人人"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });*/

  // Caption
  $('.article-entry').each(function(i) {
    $(this).find('img').each(function() {
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function() {
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox) {
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function() {
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function() {
    setTimeout(function() {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function() {
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function() {
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });

  // link
  var $linkUl = $('#link-list');
  var $list = $('#link-list li');
  $linkUl.empty();
  var count = $list.length;
  for (var i = 0; i < count; i++) {
    var ran = Math.floor(Math.random() * $list.length);
    $linkUl.append($list.eq(ran));
    $list.splice(ran, 1);
  }
  var musicobj = new Audio();
  var mbtn = document.querySelector(".controls--play-button");
  var list = [
    "Boehm、Charlie Puth&Hotline Bling",
    "Ne-Yo&Because Of You",
    "Calvin Harris、Rihanna&This Is What You Came For (KNXER Bootleg)",
    "Kygo、Ellie Goulding&First Time",
    "The Chainsmokers、Phoebe Ryan&All We Know"
  ];
  var controls = {
    switch: mbtn,
    forward: document.querySelector(".fa-forward"),
    backward: document.querySelector(".fa-backward"),
    title: document.querySelector(".song-info--title"),
    artist: document.querySelector(".song-info--artist"),
    progress: document.querySelector(".progress--progress-bar"),
    start: document.querySelector(".progress--time__start"),
    end: document.querySelector(".progress--time__end")
  }
  var music = function(e, e2, e3) {
    this.last = e3.length - 1;
    this.number = 0;
    this.btn = e2.switch;
    this.forward = e2.forward;
    this.backward = e2.backward;
    this.title = e2.title;
    this.artist = e2.artist;
    this.start = e2.start;
    this.end = e2.end;
    this.progress = e2.progress;
    this.obj = e;
    this.list = e3;
    this.set(this.number);
    this.obj.addEventListener("ended", function() {
      this.goon();
    }.bind(this));
    this.btn.addEventListener("click", function() {
      this.switch();
    }.bind(this));
    this.forward.addEventListener("click", function() {
      this.goon();
    }.bind(this));
    this.backward.addEventListener("click", function() {
      this.back();
    }.bind(this));
    this.obj.addEventListener("timeupdate", function() {
      this.timeupdate();
    }.bind(this));
    this.play();
  }
  music.prototype.play = function() {
    this.obj.play();
  }
  music.prototype.pause = function() {
    this.obj.pause();
  }
  music.prototype.goon = function() {
    this.number++;
    if (this.number <= this.last) {
      this.set(this.number);
      this.obj.play();
    } else {
      this.number = 0;
      this.set(this.number);
      this.obj.play();
    }
  }
  music.prototype.change = function(fmt, ts) {
    var days = Math.floor(ts / (24 * 3600 * 1000));
    var leave1 = ts % (24 * 3600 * 1000);
    var hours = Math.floor(leave1 / (3600 * 1000));
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
      //计算相差秒数
    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    var o = {
      "d+": days, //日 
      "h+": hours, //小时 
      "m+": minutes, //分 
      "s+": seconds, //秒  
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dateoj.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  music.prototype.timeupdate = function() {
    var currentTime = this.obj.currentTime || 0;
    var duration = this.obj.duration || 0;
    this.progress.value = parseInt(currentTime);
    this.progress.max = parseInt(duration);
    this.start.innerHTML = this.change('mm:ss', currentTime * 1000);
    this.end.innerHTML = this.change('mm:ss', duration * 1000);
  }
  music.prototype.set = function(e) {
    var nowname = this.list[e];
    var nownamearr = nowname.split("&");
    this.title.title = nownamearr[1];
    this.title.innerHTML = nownamearr[1];
    this.artist.innerHTML = nownamearr[0];
    this.artist.title = nownamearr[0];
    this.obj.src = "/media/" + nowname + ".mp3";
  }
  music.prototype.back = function() {
    this.number--
      if (this.number >= 0) {
        this.set(this.number);
        this.obj.play();
      } else {
        this.number = this.last;
        this.set(this.number);
        this.obj.play();
      }
  }
  music.prototype.switch = function() {
    var status = this.btn.dataset.music;
    if (status == "play") {
      this.btn.dataset.music = "pause";
      this.pause();
    } else {
      this.btn.dataset.music = "play";
      this.play();
    }
  }
  var m = new music(musicobj, controls, list);
  $(document).on("click", "a", function(e) {
    e.preventDefault();
    var location = this.href;
    if($(this).attr('target') == '_blank'){
      window.open(location)
    }
    loadsomething(location);
  });
  var loadsomething = function(e) {
    var xhr = new XMLHttpRequest();
    xhr.onprogress = function(e){
      console.log(e);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState==4 && xhr.status ==200) {
        var thehtml = $(xhr.responseText).find("#primary>#content");
        $("#primary").html(thehtml);
      }
    }
    xhr.open("get",e,true);
    xhr.send(null);
  }
})(jQuery);