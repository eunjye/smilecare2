/* 보험나이계산 */
function Bohumnai(id)
{
	now = new Date(); // 현재날짜

	var y_dt;
	var m_dt;
	var d_dt;
	
	y_dt = now.getFullYear(); // 현재년도
	m_dt = now.getMonth()+1; // 현재월
	d_dt = now.getDate(); // 현재일
	
	b_year = parseInt(id.substring(0,4),10); // 대상자 생년
	b_month = parseInt(id.substring(4,6),10); // 대상자 생월
	b_day = parseInt(id.substring(6,8),10); // 대상자 생일
	
	r_year = y_dt; // 현재년도
	r_month = m_dt; // 현재월
	r_day = d_dt; // 현재일
	
	if (b_day > r_day) // 현재일보다 생일이 클경우
	{
	     switch (r_month) // 현재월에서 1을 빼고 현재일에 이전달의 일수를 더함
	     {
	          case 1 :
	               r_month = r_month - 1;
	               r_day = r_day + 31;
	               break;
	
	          case 2 :
	               r_month = r_month - 1;
	               r_day = r_day + 31;
	               break;
	
	          case 3 :
	               r_month = r_month - 1;
	               if ( ( r_year % 4 ) == 0 )
	                             r_day = r_day + 29;
	               else
	                             r_day = r_day + 28;
	               break;
	
	          case 4 :
	               r_month = r_month - 1;
	               r_day = r_day + 31;
	               break;
	
	          case 5 :
	               r_month = r_month - 1;
	               r_day = r_day + 30;
	               break;
	
	          case 6 :
	               r_month = r_month - 1;
	               r_day = r_day + 31;
	               break;
	
	          case 7 :
	               r_month = r_month - 1;
	               r_day = r_day + 30;
	               break;
	
	          case 8 :
	               r_month = r_month - 1;
	               r_day = r_day + 31;
	               break;
	
	          case 9 :
	               r_month = r_month - 1;
	               r_day = r_day + 31;
	               break;
	
	          case 10 :
	               r_month = r_month - 1;
	               r_day = r_day + 30;
	               break;
	
	          case 11 :
	               r_month = r_month - 1;
	               r_day = r_day + 31;
	               break;
	
	          case 12 :
	               r_month = r_month - 1;
	               r_day = r_day + 30;
	               break;
	     }
	}

	x_day = r_day - b_day; // (계산된)현재일에서 생일을 뺌
	
	if ( b_month > r_month ) // 현재 월보다 생월이 클 경우
	{
		// 현재년도에서 1을 빼고 현재월에 12를 더함
	     r_month = r_month + 12;
	     r_year = r_year - 1;
	}
	
	x_month = r_month - b_month; // (계산된)현재월에서 생월을 뺌
	x_year = r_year - b_year; // (계산된)현재년도에서 생년을 뺌
	
	if ( x_month > 5 ) // 월을 뺀 값이 5보다 큰경우 년도를 뺀 값에 1을 더함
	     nai = x_year + 1;
	else
	     nai = x_year;
	
	return nai;
}

/* 생년 계산 (YYYY)*/
function calcBtYYYY(resiNo){
	var nYear, bYear;
	var today =  new Date();
	nYear = today.getFullYear();
	
	if(parseInt(resiNo.substr(5,1),10)<3){
		bYear = 1900 + parseInt(resiNo.substring(0,2),10);
	}else{
		bYear = 2000 + parseInt(resiNo.substring(0,2),10);
	}
	return bYear.toString();
}

/* 금액 텍스트 변환 */
function amtTextVal(amt){
	var AmtVal="";
	if(amt.length > 4){	//만단위 이상
		amt = amt.substr(0,amt.length-4);
		AmtVal = (amt.length >= 5? Number(amt.substr(0,amt.length-4)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',') + "억":"")
		+(Number(amt.substring(amt.length,amt.length-4)) > 0?Number(amt.substring(amt.length,amt.length-4)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',') + "만":"");
	}else{
		AmtVal = amt.replace(/\B(?=(\d{3})+(?!\d))/g,',');
	}
	
	amtVal = AmtVal + "원";
	return amtVal;
}

/* 이메일 도메인 자동완성 */
function autoCompleteEmail(wrap, option) {
	// setting
	var domainList = [ // 기본 도메인 리스트
		'daum.net',
		'gmail.com',
		'hanmail.net',
		'naver.com',
		'nate.com',
	]
	if (typeof(option) === 'object'){
		if (!!option.domainList) {
			domainList = option.domainList;
		}
	}

	// run point
	function extractLast( val ) {
		if (val.indexOf("@")!=-1){
			var tmp = val.split("@")
				, _id = val.substring(0, val.lastIndexOf("@"));
			if (tmp[tmp.length-1] === '') {
					// 이 때 나타나야함
					return {
						id: _id
					};
			} else {
					return {
						id: _id,
						domain: tmp[tmp.length-1]
					};
				}
		}
		$('.ui-menu').hide();
		return "";
	}

	// bind
	$(wrap).find('.ui-autocomplete-inp')
		.bind( "keydown", function( event ) {
				if ( event.keyCode === $.ui.keyCode.TAB &&
								$(this).data( "autocomplete" ).menu.active ) {
						event.preventDefault();
				}
		})
		.autocomplete({
				minLength: 1,
				source: function( request, response ) {
						var mail = extractLast(request.term).domain
							, id = extractLast(request.term).id;

							if (!!id) { // @ 쳤을 시
								if (!!mail){  // @ 다음 문자열 있을 시
									var matcher = new RegExp( "^" + mail, "i" );
									response($.grep(domainList, function(item){
											return matcher.test(item);
									}));
								} else { // @만 쳤을 시
									response(domainList);
								}
								$('.ui-menu-item').each(function(_idx, item){
										var _text = $(item).find('a').html()
												, _html = ''
												, _point = !!mail ? id + '@' + mail : id + '@';
												
										_html = '<b>' + _point + '</b>';
										_html += !!mail ? _text.split(mail)[1] : _text;
										$(item).find('a').html(_html);
								})
						} else {
							return;
						}
					},
				focus: function() {
						// prevent value inserted on focus
						return false;
				},
				appendTo: wrap,
				select: function( event, ui ) {
						var terms = this.value.split(", ");
						// remove the current input
						var _id = this.value.substring(0, this.value.lastIndexOf("@"));
						terms.pop();
						// add the selected item
						terms.push( _id + "@" + ui.item.value );
						// add placeholder to get the comma-and-space at the end

						this.value = terms.join("");
						return false;
				}
		});
}

// popup load by ajax
function openPopup(id, callback){
	if (!$('#'+id).length) {
		loadPopup(id);
	} else {
		$('#'+id).insertAfter($('.ui-modal').last());
	}
	
	$plugins.uiModalOpen({
		id:id,
		full:false,
		callback: function(v){
			console.log('open :', v );
			!!callback && callback();
		}
	});

	function loadPopup(id){
		$.ajax({
			type: 'GET',
			url: './'+id+'.html',
			cache: false,
			async: false,
			headers: {
				"cache-control" : "no-cache", 
				"pragma" : "no-cache"
			},
			error: function(request, status, err) {
				console.log("error");
			},
			success: function(v) {
				$('.smilecare').append($(v).find('#'+id));
			}
		});
	}
}

function fixedBanner(el) {
	var $ts = $(el)
		, $inner = $ts.find('.floating-inner')
		, tsH
		, tsY = $ts.offset().top
		, innerH
		, docY
		, _flag = false;

	!$ts.hasClass('floating') && $ts.addClass('floating');
	innerH = $inner.outerHeight();
	$inner.css('top', -innerH);
	$ts.removeClass('floating');
	tsH = $ts.outerHeight();
	$ts.css('height', tsH);
	
	if ($('html').prop('scrollTop') > tsY + tsH) {
		$ts.addClass('floating');
		$inner.css({top:0, opacity:1});
	}

	$(document)
	.off('scroll.fixedBanner')
	.on('scroll.fixedBanner', function(){
		docY = $('html').prop('scrollTop');
		if (docY > tsY + tsH) {
			if (!_flag && !$ts.hasClass('floating')) {
				$ts.addClass('floating');
				_flag = true;
				$inner.css('opacity', 0).animate({
					top: 0,
					opacity: 1
				}, 250, function(){
					_flag = false;
				})
			}
		} else {
			$ts.removeClass('floating');
			$inner.css({top: '-'+innerH+'px'});
		}
	});
	
}

var slidePage = {
	init: function(id) {
		var $wrap = $('#'+id)
			, $panelWrap = $wrap.find('.apply-items')
			, $panel = $wrap.find('.apply-inner');

		$panelWrap.css({width: 720*$panel.length}); // 720: apply-inner의 width
		$panel.css({width: 720, height: 350}); // 350: apply-inner의 height
	},
	goSlidePage: function(v, callback) {
		var $wrap = $('.apply-wrap')
			, $panel = $wrap.find('.apply-inner')
			, $panelWrap = $wrap.find('.apply-items')
			, $onPanel = $('.apply-inner.on')
			
			, num = v;
			
		$panel.eq(num-1).addClass('on');
		$panelWrap.animate({
			marginLeft: -$panel.outerWidth()*(num-1)
		}, 400, function(){
			$onPanel.removeClass('on');
			$panelWrap.css('padding-left', $panel.outerWidth()*(num-1));
			!!callback && callback();
		});
	}
}