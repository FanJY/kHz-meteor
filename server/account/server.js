oss = null;
Meteor.startup(function() {

	facc.sms.account = "Fmxx888";
    facc.sms.pwd = "fami@2014";
    // facc.email.url = "smtp:/%40fami2u.com:Fami2014@smtp.exmail.qq.com:465";
    // facc.email.from = "FAMI客服 <kf@fami2u.com>";

    facc.insert = function(err, id) {

        if (err) {
            console.log(err);
        } else {

            var masters = Meteor.users.find({isinit:1}).fetch();

            var master_arr = [];
            for(var i = 0 ; i < masters.length ; i++){
                master_arr.push(masters[i]._id);
                Meteor.users.update(masters[i]._id, {
                    $addToSet: {
                        masters: id,            
                    }
                });
            }
            
            var avatar = "/avatar/avatar"+ Math.floor(Math.random()*100) + ".jpg";

            Meteor.users.update(id, {
                $set: {
                    "avatar":avatar           
                }
            });
        }

    }

    // facc.init();

    oss = new ALY.OSS({
        accessKeyId: "eMR13xzds76gUI4n",
        secretAccessKey: "dEtSwWNf7pGjiKIJR6xeA2Lsm8zbXL",
        endpoint: "http://oss-cn-beijing.aliyuncs.com",
        apiVersion: "2013-10-15"
    });


   // dataInit();
    // Meteor.users.find().observe({
    //     added: function(doc) {

    //     }
    // });
});
