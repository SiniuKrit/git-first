/*** Form Style ***/

$(function(){
    setTimeout(function(){
        $("select").styler({
            selectSmartPositioning: false
        })
    }, 100)
});

/*** Select Change ***/

$(function(){
    var id_prod;
    $(".buttonOrder").on("click", function(){
        id_prod = $(this).data("prod");
        $(".selectProd select option").prop("selected", false);
        $(".selectProd select option[value='"+id_prod+"']").prop("selected", true);
        setTimeout(function(){
            $(".selectProd select").trigger("refresh")
        }, 100)
    })
});

/*** Slick Slider ***/

$(function(){
	$("#slider1").slick({
		slidesToShow: 5,
        appendArrows: $("#slider1Arrow"),
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	$("#slider2").slick({
		slidesToShow: 2,
        appendArrows: $("#slider2Arrow"),
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1
				}
			}
		]
	})
});

/*** Validation ***/

$(function(){
	function addPreloader(){
		$("form.loadForm").each(function(indx){
			$(this).append('<div class="preloader"><img src="img/check.gif" width="64" height="64" alt="load"></div>')
		})
	};
	addPreloader();
	$("form").validationEngine("attach", {
		onValidationComplete: function(form, status){
			if(status == true){
				var arrayClass = [].slice.call(form[0].classList);
				arrayClass.forEach(function(item) {
				    if(item == "loadForm"){
					   $(form[0]).find(".preloader").show()
				    }
				});
				return true;
			}
			else return false;
	      },
	      scroll: false
	})
});

/*** Form Count ***/

$(function(){
    var inp,
        ii;
    $(".countPlus").on("click", function(){
        inp = $(".countPlus").closest(".countPartArrows").prev("input");
        ii = inp.val();
        ii++;
        inp.val(ii);
        return false
    });
    $(".countMinus").on("click", function(){
        inp = $(".countPlus").closest(".countPartArrows").prev("input");
        ii = inp.val();
        if(ii == 1){
            return false
        } else {
            ii--;
            inp.val(ii);
            return false
        }
    })
});

/*** Multi Form ***/

$(function(){
    $(".selectPlus").on("click",function(){
        $thisForm = $(this).parents("form");
        $idProd = $thisForm.find(".listProdForm :selected").val();
        $nameProd = $thisForm.find(".listProdForm :selected").text();
        $kolProd = $thisForm.find(".kolProdForm :selected").val();
        $checkProdInBasket = 0;
        $thisForm.find(".modal2ItemCon .clearfix").each(function(indx){
            if($(this).data("line-prod") == $idProd){
                $checkProdInBasket = 1
            }
        });
        if($checkProdInBasket == 0){
            $thisForm.find(".modal2ItemCon")
            .append('<div class="clearfix lineProd" data-line-prod="'+$idProd+'">'+
                    '<div>'+$nameProd+'</div>'+
                    '<div>'+
                        '<a class="modal2ItemMin countProd" href="javascript:void(0);" data-action="m">-</a>'+
                        '<span class="lookKol">'+$kolProd+'</span> <span>шт.</span>'+
                        '<a href="javascript:void(0);" class="countProd" data-action="p">+</a>'+
                    '</div>'+
                    '<div>'+
                        '<a href="javascript:void(0);" class="deleteProd" data-delete-prod="'+$idProd+'"></a>'+
                    '</div>'+
                    '<input type="hidden" name="prod[]" value="'+$idProd+'">'+
                    '<input type="hidden" name="kol[]" value="'+$kolProd+'">'+
                '</div>')
        }

    });
    $(".modal2ItemCon").on("click", ".deleteProd", function(){
        $thisForm = $(this).parents("form");
        $thisForm.find(".lineProd[data-line-prod='"+$(this).data("delete-prod")+"']").remove()
    });
    $(".modal2ItemCon").on("click", ".countProd", function(){
        $lineProd = $(this).parents(".lineProd");
        $nowCount = parseInt($lineProd.find("input[name='kol[]']").val());
        $actionCount = $(this).data("action");
        $newCount = 0;
        if($actionCount == "p"){
              $newCount = $nowCount + 1
        }
        else if($actionCount == "m" && $nowCount > 1){
            $newCount = $nowCount - 1
        }
        else {
            $newCount = $nowCount
        }
        $lineProd.find("input[name='kol[]']").val($newCount);
        $lineProd.find(".lookKol").text($newCount)
    })
});

/*** City In Form ***/

$(function(){
	ymaps.ready(function(){
		var geo = ymaps.geolocation;
		var geo_city = geo.city;
		$(".ymaps_city").val(geo_city)
	})
});
