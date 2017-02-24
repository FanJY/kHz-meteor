Template.basic.onRendered(function(){
    $(".rnca_choice").click(function(){
        if (!$(this).hasClass("bg_img")) {
            $(this).css("background-image","url(/rnca_choice.png)");
            $(this).addClass("bg_img");
        }else{
            $(this).css("background-image","none");
            $(this).removeClass("bg_img");
        }
    });
});
Template.basic.helpers({
    basic:function(){
        return Basics.findOne({userid:facc.user()._id});
    }
});
Template.basic.onCreated(function() {
    this.subscribe("basic", facc.user()._id);
});
Template.basic.events({
    "change #md-avatar": function(event) {
        var that = $(event.currentTarget);
        var reader = new FileReader();
        reader.onload = function(e) {
            var base64 = this.result;
            that.parent().css({
                "background-image": "url(" + base64 + ")"
            });
            that.attr("data-avatar", base64)

        }
        reader.readAsDataURL(event.currentTarget.files[0]);
    },
    "click #md-create": function() {
        Meteor.call('saveMrecord', {
            userid:facc.user()._id,
            "avatar": $("#md-avatar").attr("data-avatar"),
            "name":$("#name").val(),
            "bespeak_tel":$("#bespeak_tel").val(),
            "weixin":$("#weixin").val(),
            "region":$("#region").val(),
            "address":$("#address").val(),
            "introduce":$("#introduce").val(),
        }, function(error, result) {
            // console.log(error);
            if($("#name").val() && $("#bespeak_tel").val() && $("#region").val() && $("#address").val()!= ""){
            FlowRouter.go("/");
        }
        });
    }
});
Template.basic.events({
    "click #md-create":function(){
        if($("#md-avatar").val() == ""){
            alert("请插入头像"); 
            return ;
        }
        if($("#name").val() == ""){
            alert("请输入客栈名称");
            return ;
        }
        if($("#bespeak_tel").val() == ""){
            alert("请输入预约电话");
            return ;
        }
        if($("#region").val() == ""){
            alert("请输入地区");
            return ;
        }
        if($("#address").val() == ""){
            alert("请输入详细地址");
            return ;
        }
        FlowRouter.go("/");
    }
});