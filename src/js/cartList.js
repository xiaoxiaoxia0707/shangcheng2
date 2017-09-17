//新增 zjk
            goodsNumFn();
            function goodsNumFn() {
                //减
                $('.reduce').off('click').on('click', function () {
                    var obj = $(this).siblings('input');
                    var num = obj.val();
                    if (num == 1) {
                        return false;
                    } else {
                        num--;
                        obj.val(num)
                    }
                    return false;
                })


                $('.plus').off('click').on('click', function () {
                    var obj = $(this).siblings('input');
                    var num = obj.val();
                    num++;
                    obj.val(num)
                    return false;
                })
            }

            $("#editBtn").click(function () {
                if ($("#editBtn").text() == "编辑") {
                    $("#editBtn").text("完成");
                    $(".accountBtn").text("删除").addClass('g-del').removeClass('g-pay');
                    $('.cart-content .item-after').css('display', 'inherit');
                    $('.cart-content .number').hide();
                } else {
                    $("#editBtn").text("编辑");
                    $(".accountBtn").text("结算").addClass('g-pay').removeClass('g-del');
                    ;
                    $('.cart-content .item-after').css('display', 'none');
                    var number = $('.cart-content .number');
                    for (var i = 0; i < number.length; i++) {
                        $(number[i]).text('x' + $(number[i]).siblings('.item-after').find('.s-num').val())
                    }
                    number.show();
                    totalPrice();
                }
            });
///全选按钮
            $('.b-name').on('click', 'label', function (e) {
                e.preventDefault();
                var all = $(this).find('.s-all'),
                    checkList = $(this).parents('.list-block').find('input').not('.s-all');
                if (all.prop('checked') == false) {
                    all.prop('checked', true);
                    checkList.prop('checked', true);
                } else {
                    all.prop('checked', false);
                    checkList.prop('checked', false);
                }
                totalPrice();
            })

//计算总价 所有勾选的商品单价乘以数量  在相加

            $('.item-media').click(function () {
                $(this).siblings('input').trigger('change')
            })
            $('input').change(function () {
                totalPrice();
            })
            //进入页面全选
            $('input').prop('checked',true).trigger('change');
   
function totalPrice() {
    var selectInput = $('.content').find('input:checked').not('.s-all'),
        totalPrice = 0;
    if (selectInput.length == 0) {
        $('.total-price').text('0');
    } else {
        for (var i = 0; i < selectInput.length; i++) {
            var p = $(selectInput[i]).siblings('.item-inner').find('.s-price').text(),
                n = $(selectInput[i]).siblings('.item-inner').find('.s-num').val();
            totalPrice = totalPrice + (p * n);
        }
        $('.total-price').text(totalPrice);
    }

}
//购物车删除
$(document).on('click', '.g-del', function () {
    var cInput = $(document).find('input:checked').not(".s-all"),
        pidList = '';
    if (cInput.length == 0) {
        $.toast('请选择要删除的商品');
        return false;
    } else {
        $.confirm('确定删除商品', function () {
            //选中状态下的 productID list 和 商品数量list
            for (var i = 0; i < cInput.length; i++) {
                var pid = $(cInput[i]).parents('li').find('.pid').text();
                pidList += pid;
                if (i == cInput.length - 1) {
                    break
                } else {
                    pidList += ',';
                }
            }
            $.ajax({
                type: "POST",
                url: "/front/catalog/deleteProduct",
                dataType: "json",
                data: {
                    accountID: id,
                    productID: pidList
                },
                success: function (data) {
                    if (data.success) {
                        queryCartList();
                        $.toast("删除成功");
                        setTimeout(function () {
                            totalPrice();
                        }, 100)
                    }
                }
            })
        })

    }
})
$(".item-amount a").click(function () {
    var count = $(this).attr("data");
    console.log(count);
    $("#itemAmount").val(function () {
        var value = $(this).val();
        count == "-" ? value-- : value++;
        if ((value > 1) && (value < 5)) {
            $(".item-amount .minus").removeClass("no-minus");
            return value;
        }
        else if (value = 1) {
            $(".item-amount .minus").addClass("no-minus");
            var value = 1;
            return value;
        }
    })
});
$(".amount a").click(function () {
    var count = $(this).attr("data");
    console.log(count);
    $("#itemAmount").val(function () {
        var value = $(this).val();
        count == "-" ? value-- : value++;
        if ((value > 1) && (value < 5)) {
            $(".amount .minus").removeClass("no-minus");
            return value;
        }
        else if (value = 1) {
            $(".amount .minus").addClass("no-minus");
            var value = 1;
            return value;
        }
    })
});