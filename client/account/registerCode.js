Template.registerCode.events({
    'click .regComBtn': function() {
        if ($("#code").val() == "") {
            alert("请输入验证码");
        }

        Meteor.call('accountRegisterWithCode', {
            "code": $("#code").val()
        }, function(error, result) {
            if (typeof result == "object") {
                facc.set(result);
                alert(result.nickname + '：欢迎，注册已成功～');
                facc.backto();
                var exp = {
                    userid:facc.user()._id,
                    avatar:facc.user().avatar||"",
                    name:facc.user().name||"",
                    bespeak_tel:$("#bespeak_tel").val()||"" ,
                    weixin:$("#weixin").val() ||"",
                    region:$("#region").val() ||"",
                    address:$("#address").val()||"",
                    introduce : $("#introduce").val()||"",
                    createAt:new Date()
                }
                Basics.insert(exp);

            } else if (result == "ERROR_RIGHT") {
                alert('权限不足');
            } else if (result == "ERROR_REPEAT_TEL") {
                alert('手机号码已存在');
            } else if (result == "ERROR_REPEAT_NICK") {
                alert('昵称已存在');
            } else {
                alert('注册信息错误');
            }

        });
    },
});
